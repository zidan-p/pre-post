import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ForbiddenException, NotFoundException } from "~/common/exceptions";



export namespace GetPostsByCurrentUserUseCaseErrors {
  export class PostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id: string | number){
      const message = "Post With id [ " + id + " ] nto found ";
      super(false, new NotFoundException(message, undefined, {postId: id}));
    }
  }

  export class UserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id: string | number){
      const message = "Invalid user with id [ " + id + " ] to access this resourcce";
      super(false, new NotFoundException(message, undefined, {userId: id}));
    }
  }
}