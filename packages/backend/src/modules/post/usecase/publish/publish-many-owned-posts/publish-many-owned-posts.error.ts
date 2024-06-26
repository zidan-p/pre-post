import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, InternalServerErrorException, NotFoundException } from "~/common/exceptions";



export namespace PublishManyOwnedPostsUseCaseErrors {
  export class SomePostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(ids: string[] | number[]){
      const message = "Post With id [ " + ids.join(", ") + " ] not found ";
      super(false, new NotFoundException(message));
    }
  }

  export class InvalidPostIdValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message: string = "Invalid Provided Request"){
      super(false, new ArgumentInvalidException(message));
    }
  }

  export class ForbiddenAccess extends Result<UseCaseError, NotFoundException>{
    constructor(userId: string | number){
      const message = "User wiht id [ " + userId + " ] can't access this post resource";
      super(false, new NotFoundException(message));
    }
  }

  export class FailBuilUser extends Result<UseCaseError, InternalServerErrorException>{
    constructor(userId: string | number){
      const message = "can't build user wiht id : " + userId;
      super(false, new InternalServerErrorException(message));
    }
  }

  export class IssueWhenBuilding extends Result<UseCaseError, InternalServerErrorException>{
    constructor(message: string = "Issue when building process"){
      super(false, new InternalServerErrorException(message));
    }
  }

  export class UserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(userId: string){
      const message = "User with id [ " + userId + " ] not found in database";
      super(false, new NotFoundException(message, undefined, {userId}));
    }
  }
}