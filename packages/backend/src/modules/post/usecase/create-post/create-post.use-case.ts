import { UseCase } from "~/common/core/UseCase";
import { CreatePostDTO, CreatePostDTORequest, CreatePostDTOResponse, CreatePostFiles } from "./create-post.dto";
import { Post } from "../../domain/post.agregate-root";
import { PostImage, PostImageProps } from "../../domain/post-image.entity";
import { PostTitle } from "../../domain/post-title.value-object";
import { PostContent } from "../../domain/post-content.value-object";
import { UserId } from "../../domain/user-id.value-object";
import { AppError } from "~/common/core/AppError";
import { Result, left } from "~/common/core/Result";
import { CreatePostResponse } from "./create-post.response";
import { ArgumentInvalidException } from "~/common/exceptions";
import { CreatePostUseCaseErrors } from "./create-post.error";
import { PostImageManager } from "../../domain/post-image.manager";
import { IImageRepo } from "../../repository/image.repository.port";
import { IUserRepo } from "../../repository/user.repository.port";
import { IPostRepo } from "../../repository/post.repository.port";
import { IPostImageRepo } from "../../repository/post-image.repository.port";




export class CreatePostUseCase implements UseCase<CreatePostDTORequest, Promise<CreatePostResponse>>{

  constructor(
    private readonly postImageRepository: IPostImageRepo,
    private readonly userRepository: IUserRepo,
    private readonly postRepository: IPostRepo
  ){}

  async execute(request: CreatePostDTORequest): Promise<CreatePostResponse> {
    let post: Post;
    let postImageManager: PostImageManager;
    let postTitle: PostTitle;
    let postContent: PostContent;
    let userId: UserId;

    try {
      const files = request.files;
      const postImageProps: PostImageProps = {...files.postImage, imageType: "post-image"};
      
      const postImageOrError = PostImage.create(postImageProps);

      if(postImageOrError.isFailure)
        return left( new CreatePostUseCaseErrors.InvalidImageProperties(
          postImageOrError.getErrorValue()
        ));

      // save the image data to database
      
      const postImage = postImageOrError.getValue();
      this.postImageRepository.save(postImage);
      
      const postImageManagerOrError = PostImageManager.create({currentImage: postImage});
      if(postImageManagerOrError.isFailure)
        return left(new CreatePostUseCaseErrors.InvalidImageManagerProps(postImageManagerOrError.getErrorValue()));
      
      
      const postTitleOrError = PostTitle.create({value: request.title});
      const postContentOrError = PostContent.create({value: request.content});

      const combineresult = Result.combine([postTitleOrError, postContentOrError]);

      if(combineresult.isFailure)
        return left(new CreatePostUseCaseErrors.InvalidProperties(combineresult.getErrorValue().message, combineresult.getErrorValue()));

      postTitle = postTitleOrError.getValue();
      postContent = postContentOrError.getValue();

      const user = await this.userRepository.getUserByUserId(String(request.ownerId));

      if(!user)
        return left(new CreatePostUseCaseErrors.UserNotFound(request.ownerId, "user not found for id " + request.ownerId));

      userId = user.userId;

      const postOrError = Post.create({
        postTitle,
        ownerId : userId,
        postContent,
        isPublised : false,
        postImageManager,
        dateTimeCreated: new Date()
      })



    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}