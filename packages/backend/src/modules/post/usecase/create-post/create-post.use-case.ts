import { UseCase } from "~/common/core/UseCase";
import { CreatePostDTO, CreatePostDTOResponse, CreatePostFiles } from "./create-post.dto";
import { Post } from "../../domain/post.agregate-root";
import { PostImage, PostImageProps } from "../../domain/post-image.entity";
import { PostTitle } from "../../domain/post-title.value-object";
import { PostContent } from "../../domain/post-content.value-object";
import { UserId } from "../../domain/user-id.value-object";
import { AppError } from "~/common/core/AppError";
import { left } from "~/common/core/Result";
import { CreatePostResponse } from "./create-post.response";
import { ArgumentInvalidException } from "~/common/exceptions";
import { CreatePostUseCaseErrors } from "./create-post.error";




export class CreatePostUseCase implements UseCase<CreatePostDTO, Promise<CreatePostResponse>>{

  async execute(request: CreatePostDTO, files: CreatePostFiles): Promise<CreatePostResponse> {
    let post: Post;
    let postImage: PostImage;
    let postTitle: PostTitle;
    let postContent: PostContent;
    let userId: UserId;

    try {
      const postImageProps: PostImageProps = {...files.postImage, imageType: "post-image"};
      
      const postImageOrError = PostImage.create(postImageProps);

      if(postImageOrError.isFailure)
        return left( new CreatePostUseCaseErrors.InvalidImageProperties(
          postImageOrError.getErrorValue() as ArgumentInvalidException
          ));
      
      

    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}