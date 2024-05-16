import { UseCase } from "~/common/core/UseCase";
import { Post } from "../../domain/post.agregate-root";
import { PostImage, PostImageProps } from "../../domain/post-image.entity";
import { PostTitle } from "../../domain/post-title.value-object";
import { PostContent } from "../../domain/post-content.value-object";
import { UserId } from "../../domain/user-id.value-object";
import { AppError } from "~/common/core/AppError";
import { Result, left, right } from "~/common/core/Result";
import { ArgumentInvalidException } from "~/common/exceptions";
import { IUserRepo } from "../../repository/user.repository.port";
import { IPostRepo } from "../../repository/post.repository.port";
import { IPostImageRepo } from "../../repository/post-image.repository.port";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";
import { UpdatePostDTORequest } from "./update-post.dto";
import { UpdatePostResponse } from "./update-post.response";
import { UpdatePostUseCaseErrors } from "./update-post.error";




export class UpdatePostUseCase implements UseCase<UpdatePostDTORequest, Promise<UpdatePostResponse>>{

  constructor(
    private readonly postImageRepository: IPostImageRepo,
    private readonly userRepository: IUserRepo,
    private readonly postRepository: IPostRepo
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
        throw new UpdatePostUseCaseErrors.PostNotFound(postId);

      // if there are image uploaded
      if(files.postImage){
        
        const unValidatedFile = files.postImage;

        if(unValidatedFile.group !== "post/image")
          return left( new UpdatePostUseCaseErrors.InvalidImageProperties(
            new ArgumentInvalidException("Files group should be post/image not [ " + unValidatedFile.group + " ]")
          ));

        const postImageProps: PostImageProps = {
          imageType: "post-image",
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
        this.postImageRepository.save(postImage);

        // change current image
        post?.imageManager.changeImage(postImage);
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

      await this.postRepository.save(post);

      return right(Result.ok({post}));

    } catch (error) {
      console.error(error);
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}