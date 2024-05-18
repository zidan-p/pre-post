import { Result } from "~/common/core/result";
import { ArgumentInvalidException, ExceptionBase, NotFoundException } from "~/common/exceptions";
import { UseCaseError } from "~/common/core/UseCaseError";
import { BaseError } from "sequelize";



export namespace GetAllPostUseCaseErrors {

  export class InvalidProperties extends Result<UseCaseError>{
    constructor(message: string = "there are some invalid properties", cause?: ExceptionBase){
      super(false, new ArgumentInvalidException(message, cause));
    }
  }

  export class FailBuildingPost<TError extends ExceptionBase> extends Result<UseCaseError, TError>{
    constructor(cause: TError){
      super(false, cause);
    }
  }
}