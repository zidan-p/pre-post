import { Either, Result, left, right } from "~/common/core/result";
import { NotFoundException } from "~/common/exceptions";
import { UserId } from "../user-id.value-object";
import { PostId } from "../post-id.value-object";
import { DomainError } from "../exceptions/post.exception";


export namespace PostOwnershipServiceErrors{
  export class SomePostNotFound extends Result<DomainError, NotFoundException>{
    constructor(ids: string[] | number[]){
      const message = "Post With id [ " + ids.join(", ") + " ] not found ";
      super(false, new NotFoundException(message));
    }
  }

  export class NotOwnedByUser extends Result<DomainError, NotFoundException>{
    constructor(userId: string | number){
      const message = "User wiht id [ " + userId + " ] can't access this post resource";
      super(false, new NotFoundException(message));
    }
  }
}

export type IsPostExistAndOwned = Either<
  PostOwnershipServiceErrors.NotOwnedByUser | 
  PostOwnershipServiceErrors.SomePostNotFound ,
  Result<{}>
>

export class PostOwnershipService{

  isPostExistAndOwned(
    ownerId: UserId,
    postIdCollection: PostId[],
    existsCountWithThisOwnership: number,
    existsCount: number
  ): IsPostExistAndOwned {
    // when only there some post that not found
    if(existsCount < postIdCollection.length){
      // return left(new PublishManyOwnedPostsUseCaseErrors.SomePostNotFound(idCollection));
      return left(new PostOwnershipServiceErrors.SomePostNotFound(postIdCollection.map(item => item.getStringValue())))
    }

    // when the founded exists count wiith ownershipp less than that actually exists
    // the count already filtered so in this code always reach post id collection length that match exists count
    if(existsCountWithThisOwnership < existsCount)
      return left(new PostOwnershipServiceErrors.NotOwnedByUser(ownerId.getStringValue()));

    return right(Result.ok());
  }
}