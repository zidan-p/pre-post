import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteManyOwnedPostsDTORequest } from "./delete-many-owned-posts.dto";
import { DeleteManyOwnedPostsResponse } from "./delete-many-owned-posts.response";
import { DeleteManyOwnedPostsUseCaseErrors } from "./delete-many-owned-posts.error";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { UserId } from "~/modules/post/domain/user-id.value-object";
import { IPostImageRepo } from "~/modules/post/repository/post-image.repository.port";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { User } from "~/modules/post/domain/user.agreegate-root";
import { ForbiddenException } from "~/common/exceptions";
import { IStorageService } from "~/modules/post/service/storage.service.interface";
import { prePostLogger } from "~/common/core/logger.entry";

/**
 * @todo make checking on what possibly that make count difference error.
 */
export class DeleteManyOwnedPostsUseCase implements UseCase<DeleteManyOwnedPostsDTORequest, Promise<DeleteManyOwnedPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly postImageRepo: IPostImageRepo,
    private readonly userRepo: IUserRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: DeleteManyOwnedPostsDTORequest): Promise<DeleteManyOwnedPostsResponse> {
    try{
      const idCollection = request?.query?.postIds;
      const user = request.user;

      // don't do anything when postIds is not provided or defined
      if(!Array.isArray(idCollection)) return right(Result.ok({affectedRecord: 0}));
      if(idCollection?.length === 0) right(Result.ok({affectedRecord: 0}));

      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));
      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);
      if(postIdCollectionBuilderResult.isFailure)
        return left(new DeleteManyOwnedPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

      // i use count to check, beacause the id is assumed will not same among all records
      let affectedRows: number;

      // check user existance
      const owner = await this.userRepo.getUserByUserId(user.id);

      if(!owner)
        return left(new DeleteManyOwnedPostsUseCaseErrors.UserNotFound(user.id));
    
      const userId = owner.id.toString();

      // get all posts
      const posts = await this.postRepo.isInSearch({postId: postIdCollection});

      // check posts ownedship
      const isOwnedByThisUserResult = this.checkOwnerShip(posts, owner);
      if(isOwnedByThisUserResult.isFailure)
        return left(new DeleteManyOwnedPostsUseCaseErrors.ForbiddenAccess(owner.id.toString()));

      // remove teh file from storage
      const imageRemovalResult = await this.removeImageForEachPost(posts);
      if(imageRemovalResult.isFailure)
        return left(new DeleteManyOwnedPostsUseCaseErrors.DeleteOperationFailed(imageRemovalResult.getErrorValue()));


      affectedRows = await this.postRepo.deleteMany(postIdCollection);

      return right(Result.ok({affectedRecord: affectedRows}));
    } catch (error) {
      prePostLogger.error(error?.message ?? "unexpected Error", error?.stack ?? __filename);
      return left(new AppError.UnexpectedError(error.toString()));

    }
  }


  private checkOwnerShip(posts: Post[], user: User){
    for(const post of posts){
      if(post.ownerId.getStringValue() !== user.id.toString()){
        return Result.fail(new ForbiddenException(
          "post with id [ " + 
          post.id.toString() + 
          " ] is not owned by user [ " + 
          user.id.toString() + 
          "]"
        ));
      }
    }

    return Result.ok();
  }

  private async removeImageForEachPost(posts: Post[]){
    try {
      for await (const post of posts){
        const image = post.imageManager.getImage;
        if(image){
  
          // remove image from storage
          const isImageStorageExists = await this.storageService.isFileExists(image);
          if(isImageStorageExists) await this.storageService.removeFile(image);
  
          // remove image from database
          await this.postImageRepo.remove(image.id);
        }
      }
      return Result.ok();
    } catch (error) {
      return Result.fail(error);
    }

  }
  
}