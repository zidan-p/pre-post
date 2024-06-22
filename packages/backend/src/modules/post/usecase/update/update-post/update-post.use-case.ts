import { UseCase } from "~/common/core/use-case";
import { Post } from "../../../domain/post.agregate-root";
import { IMAGE_TYPE_POST_IMAGE, POST_IMAGE_GROUP, PostImage, PostImageProps } from "../../../domain/post-image.entity";
import { PostTitle } from "../../../domain/post-title.value-object";
import { PostContent } from "../../../domain/post-content.value-object";
import { UserId } from "../../../domain/user-id.value-object";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { ArgumentInvalidException } from "~/common/exceptions";
import { IUserRepo } from "../../../repository/user.repository.port";
import { IPostRepo } from "../../../repository/post.repository.port";
import { IPostImageRepo } from "../../../repository/post-image.repository.port";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";
import { UpdatePostDTORequest } from "./update-post.dto";
import { UpdatePostResponse } from "./update-post.response";
import { UpdatePostUseCaseErrors } from "./update-post.error";
import { IStorageService } from "~/modules/post/service/storage.service.interface";
import { prePostLogger } from "~/common/core/logger.entry";




export class UpdatePostUseCase implements UseCase<UpdatePostDTORequest, Promise<UpdatePostResponse>>{

  constructor(
    private readonly postImageRepository: IPostImageRepo,
    private readonly postRepository: IPostRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: UpdatePostDTORequest): Promise<UpdatePostResponse> {
    let post: Post | null;
    let postImage: PostImage | undefined = undefined;
    let postImageManager: SingleImageManager<PostImage>;
    let postTitle: PostTitle;
    let postContent: PostContent;
    let userId: UserId;

    try {
      const files = request.files;
      const body = request.body;
      const param = request.param;

      const postId = param.postId;
      // get current post
      post = await this.postRepository.findById(postId);

      if(!post)
        return left(new UpdatePostUseCaseErrors.PostNotFound(postId));

      // console.log(files);
      // console.log(body);
      // if there are image uploaded
      if(files?.postImage){
        
        const unValidatedFile = files.postImage;

        if(unValidatedFile.group !== POST_IMAGE_GROUP)
          return left( new UpdatePostUseCaseErrors.InvalidImageProperties(
            new ArgumentInvalidException("Files group should be " + POST_IMAGE_GROUP +" not [ " + unValidatedFile.group + " ]")
          ));

        const postImageProps: PostImageProps = {
          imageType: IMAGE_TYPE_POST_IMAGE,
          fileType: unValidatedFile.fileType,
          group: unValidatedFile.group,
          name: unValidatedFile.name,
          size: unValidatedFile.size
        };
        
        const postImageOrError = PostImage.create(postImageProps);
  
        if(postImageOrError.isFailure)
          return left( new UpdatePostUseCaseErrors.InvalidImageProperties(
            postImageOrError.getErrorValue()
          ));
        
        // save the image data to database
        postImage = postImageOrError.getValue();
        await this.postImageRepository.save(postImage);
        console.log(postImage);

        // remove previous image if exists
        const oldImage = post.imageManager.getImage;
        if(oldImage){
          const isImageImageExistsInStorage = await this.storageService.isFileExists(oldImage);
          if(isImageImageExistsInStorage) await this.storageService.removeFile(oldImage);

          await this.postImageRepository.remove(oldImage.id);
        }

        // change current image
        post?.imageManager.changeImage(postImage);
        post.imageManager.attachNewImage();
      }

      // check content
      if(body.content){
        const contentOrError = PostContent.create({value: body.content});

        if(contentOrError.isFailure){
          const error = contentOrError.getErrorValue();
          return left(new UpdatePostUseCaseErrors.InvalidProperties(error.message, error));
        }

        post.postContent = contentOrError.getValue();

      }

      // check title
      if(body.title){
        const titleOrError = PostTitle.create({value: body.title});

        if(titleOrError.isFailure){
          const error = titleOrError.getErrorValue();
          return left(new UpdatePostUseCaseErrors.InvalidProperties(error.message, error));
        }

        post.postTitle = titleOrError.getValue();
      }

      console.log(post.imageManager.getImage);

      await this.postRepository.save(post);

      return right(Result.ok({post}));

    } catch (error) {
      prePostLogger.error(error?.message ?? "unexpected error", error?.stack ?? __filename);
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}