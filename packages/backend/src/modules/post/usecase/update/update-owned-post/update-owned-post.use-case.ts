import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateOwnedPostDTORequest } from "./update-owned-post.dto";
import { UpdateOwnedPostResponse } from "./update-owned-post.response";
import { IPostImageRepo } from "~/modules/post/repository/post-image.repository.port";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { IStorageService } from "~/modules/post/service/storage.service.interface";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { IMAGE_TYPE_POST_IMAGE, POST_IMAGE_GROUP, PostImage, PostImageProps } from "~/modules/post/domain/post-image.entity";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";
import { PostTitle } from "~/modules/post/domain/post-title.value-object";
import { PostContent } from "~/modules/post/domain/post-content.value-object";
import { UserId } from "~/modules/post/domain/user-id.value-object";
import { UpdateOwnedPostUseCaseErrors } from "./update-owned-post.error";
import { ArgumentInvalidException } from "~/common/exceptions";
import { User } from "~/modules/post/domain/user.agreegate-root";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";


export class UpdateOwnedPostUseCase implements UseCase<UpdateOwnedPostDTORequest, Promise<UpdateOwnedPostResponse>>{

  constructor(
    private readonly postImageRepository: IPostImageRepo,
    private readonly postRepository: IPostRepo,
    private readonly userRepository: IUserRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: UpdateOwnedPostDTORequest): Promise<UpdateOwnedPostResponse> {
    let post: Post | null;
    let postImage: PostImage | undefined = undefined;
    let owner: User | null;

    try {
      const files = request?.files;
      const body = request.body;
      const param = request.param;
      const userData = request.user;

      const postId = param?.postId;

      if(!postId) return left(new UpdateOwnedPostUseCaseErrors.PostNotFound(postId));
      // get current post
      post = await this.postRepository.findById(postId);

      if(!post)
        return left(new UpdateOwnedPostUseCaseErrors.PostNotFound(postId));

      // fail when user not exists in database
      owner = await this.userRepository.getUserByUserId(userData.id);
      if(!owner) return left(new UpdateOwnedPostUseCaseErrors.UnauthorizeUser(userData));

      // fail when user is not the owner
      if(post.ownerId.getStringValue() !== owner.id.toString())
        return left(new UpdateOwnedPostUseCaseErrors.ForbiddenUser(userData?.id));

      if(files?.postImage){
        
        const unValidatedFile = files.postImage;

        if(unValidatedFile.group !== POST_IMAGE_GROUP)
          return left( new UpdateOwnedPostUseCaseErrors.InvalidImageProperties(
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
          return left( new UpdateOwnedPostUseCaseErrors.InvalidImageProperties(
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
      if(body?.content){
        const contentOrError = PostContent.create({value: body.content});

        if(contentOrError.isFailure){
          const error = contentOrError.getErrorValue();
          return left(new UpdateOwnedPostUseCaseErrors.InvalidProperties(error.message, error));
        }

        post.postContent = contentOrError.getValue();

      }

      // check title
      if(body?.title){
        const titleOrError = PostTitle.create({value: body.title});

        if(titleOrError.isFailure){
          const error = titleOrError.getErrorValue();
          return left(new UpdateOwnedPostUseCaseErrors.InvalidProperties(error.message, error));
        }

        post.postTitle = titleOrError.getValue();
      }

      await this.postRepository.save(post);
      return right(Result.ok({post}));

    } catch (error) {
      console.error(error);
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}