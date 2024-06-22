import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Left, Result, left, right } from "~/common/core/result";
import { UpdateManyPostDTORequest, UpdateManyPostFiles } from "./update-many-post.dto";
import { 
  UpdateManyPostResponse, 
  UpdateManyPostValidateCollectionId, 
  ValidatePostContentResponse, 
  ValidatePostImageResponse, 
  ValidatePostTitleResponse 
} from "./update-many-post.response";
import { UpdateManyPostUseCaseErrors } from "./update-many-post.error";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { EditableField } from "~/modules/post/domain/editable-field.interface";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { ArgumentInvalidException } from "~/common/exceptions";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { IMAGE_TYPE_POST_IMAGE, POST_IMAGE_GROUP, PostImage, PostImageProps } from "~/modules/post/domain/post-image.entity";
import { IPostImageRepo } from "~/modules/post/repository/post-image.repository.port";
import { PostTitle } from "~/modules/post/domain/post-title.value-object";
import { PostContent } from "~/modules/post/domain/post-content.value-object";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { IStorageService } from "~/modules/post/service/storage.service.interface";


export class UpdateManyPostUseCase implements UseCase<UpdateManyPostDTORequest, Promise<UpdateManyPostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly postImageRepo: IPostImageRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: UpdateManyPostDTORequest): Promise<UpdateManyPostResponse> {
    let postIdCollection: PostId[];
    let postImage: PostImage;
    let postTitle: PostTitle;
    let postContent: PostContent;

    const payload = request.body.data;
    const files = request.files;

    try {

      // check the post id
      const postIdCollectionOrLeft = await this.validateIdCollectionList(request.body.postIds);
      if(postIdCollectionOrLeft.isLeft()) {
        const exception = postIdCollectionOrLeft.value;
        return left(exception);
      };
      postIdCollection = postIdCollectionOrLeft.value.getValue();


      // validate post image when provided
      if(files.postImage){
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

      
      // get posts by post id
      const posts = await this.postRepo.isInSearch({ownerId: postIdCollection});

      // update for each post
      // posts.forEach(async post => await this.updatePost(post, postImage, postTitle, postContent, payload?.isPublished))


      // return founded id, (even when it's already self explanatory)
      return right(Result.ok({affectedRecord :posts.length}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }

  async updatePost(
    post: Post, 
    postImage: PostImage | undefined, 
    postTitle: PostTitle | undefined, 
    postContent: PostContent | undefined, 
    isPublised: boolean | undefined
  ){

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
  }


  validatePostContent(content: string): ValidatePostContentResponse{
    const contentOrError = PostContent.create({value: content});

    if(contentOrError.isFailure){
      const error = contentOrError.getErrorValue();
      return left(new UpdateManyPostUseCaseErrors.InvalidProperties(error.message, error));
    }

    return right(Result.ok(contentOrError.getValue()))
  }

  validatePostTitle(title: string): ValidatePostTitleResponse{
    const titleOrError = PostTitle.create({value: title});

    if(titleOrError.isFailure){
      const error = titleOrError.getErrorValue();
      return left(new UpdateManyPostUseCaseErrors.InvalidProperties(error.message, error));
    }

    return right(Result.ok(titleOrError.getValue()))
  }

  async validatePostImage(unValidatedFile: ICommonFile): Promise<ValidatePostImageResponse>{

    if(unValidatedFile.group !== POST_IMAGE_GROUP)
      return left( new UpdateManyPostUseCaseErrors.InvalidImageProperties(
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
      return left( new UpdateManyPostUseCaseErrors.InvalidImageProperties(
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
      return left(new UpdateManyPostUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

    const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

    // i use count to check, beacause the id is assumed will not same among all records
    let affectedRows: number;

    const existsCount = await this.postRepo.countIsInSearch({postId: postIdCollection});
    
    // when the lenght of id count and row count from database not match, that's mean there are some miss id
    if(existsCount !== postIdCollection.length){
      return left(new UpdateManyPostUseCaseErrors.SomePostNotFound(idCollection));
    }

    return right(Result.ok(postIdCollection))
  }

}