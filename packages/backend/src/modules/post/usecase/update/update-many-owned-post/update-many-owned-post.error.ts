import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { IUserAuth } from "~/common/core/user.auth.interface";
import { ArgumentInvalidException, ExceptionBase, ForbiddenException, InternalServerErrorException, NotFoundException, UnAuthorizedException } from "~/common/exceptions";

export namespace UpdateManyOwnedPostUseCaseErrors {
  export class SomePostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(ids: string[] | number[]){
      const message = "Post With id [ " + ids.join(", ") + " ] not found ";
      super(false, new NotFoundException(message));
    }
  }

  export class IssueWhenBuilding extends Result<UseCaseError, InternalServerErrorException>{
    constructor(message: string = "Issue when building process"){
      super(false, new InternalServerErrorException(message));
    }
  }

  export class InvalidProperties extends Result<UseCaseError>{
    constructor(message: string = "there are some invalid properties", cause?: ExceptionBase){
      super(false, new ArgumentInvalidException(message, cause));
    }
  }

  export class InvalidImageProperties extends Result<UseCaseError, ArgumentInvalidException>{
    constructor( cause: ExceptionBase){
      super(false, cause as ArgumentInvalidException);
    }
  }

  export class InvalidImageManagerProps extends Result<UseCaseError>{
    constructor(cause: ExceptionBase){
      super(false, cause);
    }
  }

  export class ForbiddenUser extends Result<UseCaseError, ForbiddenException>{
    constructor(userId: string){
      super(false, new ForbiddenException("user [ " + userId + " ] can't access this resource", undefined, {userId}));
    }
  }

  export class UnauthorizeUser extends Result<UseCaseError, UnAuthorizedException>{
    constructor(user: IUserAuth){
      super(false, new UnAuthorizedException("can't update post", undefined, {user}));
    }
  }

  export class PostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id?: string | number, message = "post not found"){
      super(false, new NotFoundException(message));
    }
  }

  export class FailBuildingPost extends Result<UseCaseError, ExceptionBase>{
    constructor(cause: ExceptionBase){
      super(false, cause);
    }
  }
}