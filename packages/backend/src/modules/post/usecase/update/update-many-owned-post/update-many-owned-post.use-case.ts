import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateManyOwnedPostDTORequest } from "./update-many-owned-post.dto";
import { UpdateManyOwnedPostResponse, UpdateManyPostValidateCollectionId, ValidatePostContentResponse, ValidatePostImageResponse, ValidatePostTitleResponse } from "./update-many-owned-post.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { IPostImageRepo } from "~/modules/post/repository/post-image.repository.port";
import { IStorageService } from "~/modules/post/service/storage.service.interface";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { IMAGE_TYPE_POST_IMAGE, POST_IMAGE_GROUP, PostImage, PostImageProps } from "~/modules/post/domain/post-image.entity";
import { PostTitle } from "~/modules/post/domain/post-title.value-object";
import { PostContent } from "~/modules/post/domain/post-content.value-object";
import { User } from "~/modules/post/domain/user.agreegate-root";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { UpdateManyOwnedPostUseCaseErrors } from "./update-many-owned-post.error";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { ArgumentInvalidException } from "~/common/exceptions";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";


export class UpdateManyOwnedPostUseCase implements UseCase<UpdateManyOwnedPostDTORequest, Promise<UpdateManyOwnedPostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly postImageRepo: IPostImageRepo,
    private readonly userRepo: IUserRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: UpdateManyOwnedPostDTORequest): Promise<UpdateManyOwnedPostResponse> {
    let postIdCollection: PostId[];
    let postImage: PostImage | undefined;
    let postTitle: PostTitle | undefined;
    let postContent: PostContent | undefined;
    let owner: User | null;

    const payload = request?.body;
    const files = request?.files;
    const userData = request.user;

    try {

      // check the post id
      // return the use case when the post id in not provided or empty array
      if(!Array.isArray(request?.query?.postIds)) return right(Result.ok({affectedRecord : 0}));
      if(!request?.query?.postIds?.length) return right(Result.ok({affectedRecord : 0}));

      // fail when user not exists in database
      owner = await this.userRepo.getUserByUserId(userData.id);
      if(!owner) return left(new UpdateManyOwnedPostUseCaseErrors.UnauthorizeUser(userData));

      const postIdCollectionOrLeft = await this.validateIdCollectionList(request?.query?.postIds);
      if(postIdCollectionOrLeft.isLeft()) {
        const exception = postIdCollectionOrLeft.value;
        return left(exception);
      };
      postIdCollection = postIdCollectionOrLeft.value.getValue();


      // validate post image when provided
      if(files?.postImage){
        const postImageOrLeft = await this.validatePostImage(files.postImage);
        if(postImageOrLeft.isLeft()){
          const exception = postImageOrLeft.value;
          return left(exception);
        };  
        
        postImage = postImageOrLeft.value.getValue();
      }

      // validate post content
      if(payload?.content){
        const postContentOrLeft = this.validatePostContent(payload.content);
        if(postContentOrLeft.isLeft()) return left(postContentOrLeft.value);

        postContent = postContentOrLeft.value.getValue();
      }


      // validate post title
      if(payload?.title){
        const postContentOrLeft = this.validatePostContent(payload.title);
        if(postContentOrLeft.isLeft()) return left(postContentOrLeft.value);

        postTitle = postContentOrLeft.value.getValue();
      }
      
      // get posts by post ids
      const posts = await this.postRepo.isInSearch({postId: postIdCollection});
      
      // check ownership for each post
      for(const post of posts){
        // fail when user is not the owned
        if(post.ownerId.getStringValue() !== owner.id.toString())
        return left(new UpdateManyOwnedPostUseCaseErrors.ForbiddenUser(userData?.id));
      }

      // update for each post
      for (const postKey in posts){
        const updateResult = await this.updatePost(posts[postKey], postImage!, postTitle!, postContent!, payload?.isPublished)
        if(updateResult.isFailure) throw updateResult.getErrorValue();
      }

      // clean up the uploaded files in storage
      if(postImage) await this.storageService.removeFile(postImage);

      // return founded id
      return right(Result.ok({affectedRecord :posts.length}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }

  /**
   * Updates a post with the provided image, title, content, and publishing status.
   *
   * @param {Post} post - The post to be updated.
   * @param {PostImage | undefined} postImage - The new image for the post, if provided.
   * @param {PostTitle | undefined} postTitle - The new title for the post, if provided.
   * @param {PostContent | undefined} postContent - The new content for the post, if provided.
   * @param {boolean | undefined} isPublished - The new publishing status for the post, if provided.
   * @return {Promise<Result<void, Error>>} A promise that resolves to a Result object indicating the success or failure of the update.
   */
  async updatePost(
    post: Post, 
    postImage: PostImage | undefined, 
    postTitle: PostTitle | undefined, 
    postContent: PostContent | undefined, 
    isPublised: boolean | undefined
  ){
    try {
      // set the new post image if exists
      if(postImage){
  
        // create and save clone image in database and storage
        const cloneImageFile = await this.storageService.cloneFile(postImage);
        const createCloneImageOrError = await this.validatePostImage(cloneImageFile);
        if(createCloneImageOrError.isLeft()) return Result.fail(createCloneImageOrError.value.getErrorValue());
        const cloneImage = createCloneImageOrError.value.getValue();
        this.postImageRepo.save(cloneImage);
  
        // remove previous image if exists
        const oldImage = post.imageManager.getImage;
        if(oldImage){
          const isImageImageExistsInStorage = await this.storageService.isFileExists(oldImage);
          if(isImageImageExistsInStorage) await this.storageService.removeFile(oldImage);
          await this.postImageRepo.remove(oldImage.id);
        }
  
        // change current image
        post.imageManager.changeImage(cloneImage);
        post.imageManager.attachNewImage();
  
      }
      if(postTitle) post.postTitle = postTitle;
      if(postContent) post.postContent = postContent;
  
      // only accept when not undefined
      if(isPublised !== undefined){
        // true
        if(isPublised) post.publishPost();
        else post.unPublishPost() 
      }
  
      await this.postRepo.save(post);
      return Result.ok();
    } catch (error) {
      return Result.fail(error);
    }
  }


  validatePostContent(content: string): ValidatePostContentResponse{
    const contentOrError = PostContent.create({value: content});

    if(contentOrError.isFailure){
      const error = contentOrError.getErrorValue();
      return left(new UpdateManyOwnedPostUseCaseErrors.InvalidProperties(error.message, error));
    }

    return right(Result.ok(contentOrError.getValue()))
  }

  validatePostTitle(title: string): ValidatePostTitleResponse{
    const titleOrError = PostTitle.create({value: title});

    if(titleOrError.isFailure){
      const error = titleOrError.getErrorValue();
      return left(new UpdateManyOwnedPostUseCaseErrors.InvalidProperties(error.message, error));
    }

    return right(Result.ok(titleOrError.getValue()))
  }

  async validatePostImage(unValidatedFile: ICommonFile): Promise<ValidatePostImageResponse>{

    if(unValidatedFile.group !== POST_IMAGE_GROUP)
      return left( new UpdateManyOwnedPostUseCaseErrors.InvalidImageProperties(
        new ArgumentInvalidException("Files group should be postImage not [ " + unValidatedFile.group + " ]")
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
      return left( new UpdateManyOwnedPostUseCaseErrors.InvalidImageProperties(
        postImageOrError.getErrorValue()
      ));

    const postImage = postImageOrError.getValue();

    // actually, don't save image to database, let each of posts work what should to do with it.
    // save the image data to database
    // this.postImageRepo.save(postImage); // <-- save image to database
    return right(Result.ok(postImage));
  }
  
  async validateIdCollectionList(idCollection: string[]): Promise<UpdateManyPostValidateCollectionId>{
    const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));

    const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);

    if(postIdCollectionBuilderResult.isFailure)
      return left(new UpdateManyOwnedPostUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

    const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

    // i use count to check, beacause the id is assumed will not same among all records
    let affectedRows: number;

    const existsCount = await this.postRepo.countIsInSearch({postId: postIdCollection});
    
    // when the lenght of id count and row count from database not match, that's mean there are some miss id
    if(existsCount !== postIdCollection.length){
      return left(new UpdateManyOwnedPostUseCaseErrors.SomePostNotFound(idCollection));
    }

    return right(Result.ok(postIdCollection))
  }
  
}