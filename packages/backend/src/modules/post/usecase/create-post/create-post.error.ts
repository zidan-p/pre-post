import { Result } from "~/common/core/result";
import { CreatePostDTOResponse } from "./create-post.dto";
import { ArgumentInvalidException, ExceptionBase, NotFoundException } from "~/common/exceptions";
import { UseCaseError } from "~/common/core/UseCaseError";
import { BaseError } from "sequelize";



export namespace CreatePostUseCaseErrors {

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

  export class UserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id?: string | number, message = "user not found"){
      super(false, new NotFoundException(message));
    }
  }

  export class FailBuildingPost<TError extends ExceptionBase> extends Result<UseCaseError, TError>{
    constructor(cause: TError){
      super(false, cause);
    }
  }
}