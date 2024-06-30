import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, ForbiddenException, NotFoundException } from "~/common/exceptions";

export namespace GetPostBannerUseCaseErrors {

  export class PostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id: string | number){
      const message = "Post With id [ " + id + " ] nto found ";
      super(false, new NotFoundException(message, undefined, {postId: id}));
    }
  }

  export class BannerNotFound extends Result<UseCaseError, NotFoundException>{
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

  export class ForbiddenAccess extends Result<UseCaseError, ForbiddenException>{
    constructor(message: string){
      super(false, new ForbiddenException(message));
    }
  }

  export class InvalidId extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message: string){
      super(false, new ArgumentInvalidException(message));
    }
  }
}