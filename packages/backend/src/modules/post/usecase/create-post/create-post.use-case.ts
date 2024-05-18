import { UseCase } from "~/common/core/use-case";
import { CreatePostDTORequest, CreatePostDTOResponse, CreatePostFiles } from "./create-post.dto";
import { Post } from "../../domain/post.agregate-root";
import { PostImage, PostImageProps } from "../../domain/post-image.entity";
import { PostTitle } from "../../domain/post-title.value-object";
import { PostContent } from "../../domain/post-content.value-object";
import { UserId } from "../../domain/user-id.value-object";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { CreatePostResponse } from "./create-post.response";
import { ArgumentInvalidException } from "~/common/exceptions";
import { CreatePostUseCaseErrors } from "./create-post.error";
import { IImageRepo } from "../../repository/image.repository.port";
import { IUserRepo } from "../../repository/user.repository.port";
import { IPostRepo } from "../../repository/post.repository.port";
import { IPostImageRepo } from "../../repository/post-image.repository.port";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";




export class CreatePostUseCase implements UseCase<CreatePostDTORequest, Promise<CreatePostResponse>>{

  constructor(
    private readonly postImageRepository: IPostImageRepo,
    private readonly userRepository: IUserRepo,
    private readonly postRepository: IPostRepo
  ){}

  async execute(request: CreatePostDTORequest): Promise<CreatePostResponse> {
    let post: Post;
    let postImage: PostImage | undefined = undefined;
    let postImageManager: SingleImageManager<PostImage>;
    let postTitle: PostTitle;
    let postContent: PostContent;
    let userId: UserId;

    try {
      const files = request.files;
      const body = request.body;

      // if there are image uploaded
      if(files.postImage){
        
        const unValidatedFile = files.postImage;

        if(unValidatedFile.group !== "post/image")
          return left( new CreatePostUseCaseErrors.InvalidImageProperties(
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
          return left( new CreatePostUseCaseErrors.InvalidImageProperties(
            postImageOrError.getErrorValue()
          ));
  
        // save the image data to database
        
        postImage = postImageOrError.getValue();
        this.postImageRepository.save(postImage);
      }

      
      const postImageManagerOrError = SingleImageManager.create({currentImage: postImage});
      if(postImageManagerOrError.isFailure)
        return left(new CreatePostUseCaseErrors.InvalidImageManagerProps(postImageManagerOrError.getErrorValue()));
      
      postImageManager = postImageManagerOrError.getValue();
      
      const postTitleOrError = PostTitle.create({value: body.title});
      const postContentOrError = PostContent.create({value: body.content});

      const combineresult = Result.combine([postTitleOrError, postContentOrError]);

      if(combineresult.isFailure)
        return left(new CreatePostUseCaseErrors.InvalidProperties(combineresult.getErrorValue().message, combineresult.getErrorValue()));

      postTitle = postTitleOrError.getValue();
      postContent = postContentOrError.getValue();

      const user = await this.userRepository.getUserByUserId(String(body.ownerId));

      if(!user)
        return left(new CreatePostUseCaseErrors.UserNotFound(body.ownerId, "user not found for id " + body.ownerId));

      userId = user.userId;

      const postOrError = Post.create({
        postTitle,
        ownerId : userId,
        postContent,
        isPublised : false,
        postImageManager,
        dateTimeCreated: new Date()
      })

      if(postOrError.isFailure){
        return left(new CreatePostUseCaseErrors.FailBuildingPost(postOrError.getErrorValue()));
      }

      post = postOrError.getValue();

      this.postRepository.save(post);

      return right(Result.ok({postId: post.id.toString() }));

    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}