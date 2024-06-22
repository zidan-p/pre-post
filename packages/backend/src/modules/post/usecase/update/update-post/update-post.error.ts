import { Result } from "~/common/core/result";
import { ArgumentInvalidException, ExceptionBase, NotFoundException } from "~/common/exceptions";
import { BaseError } from "sequelize";
import { UseCaseError } from "~/common/core/use-case.error.base";



export namespace UpdatePostUseCaseErrors {

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

  export class PostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id?: string | number, message = "post not found"){
      super(false, new NotFoundException(message, undefined, {postId: id}));
    }
  }

  export class FailBuildingPost<TError extends ExceptionBase> extends Result<UseCaseError, TError>{
    constructor(cause: TError){
      super(false, cause);
    }
  }
}