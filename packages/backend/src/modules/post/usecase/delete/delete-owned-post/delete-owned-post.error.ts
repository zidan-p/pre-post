import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ForbiddenException, NotFoundException } from "~/common/exceptions";


export namespace DeleteOwnedPostUseCaseErrors {
  export class UserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(userId: string){
      const message = "User with id [ " + userId + " ] not found to process this action";
      super(false, new NotFoundException(message, undefined, {userId}));
    }
  }

  export class PostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(postId: string){
      const message = "Post with id [ " + postId + " ] not found to process this action";
      super(false, new NotFoundException(message, undefined, {postId}));
    }
  }

  export class ForbiddenUser extends Result<UseCaseError, ForbiddenException>{
    constructor(userId: string){
      const message = "User with id [ " + userId + " ] don't have access to this resource";
      super(false, new ForbiddenException(message, undefined));
    }
  }
}