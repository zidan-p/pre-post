import { Result } from "~/common/core/result";
import { ArgumentInvalidException, ExceptionBase, NotFoundException } from "~/common/exceptions";
import { BaseError } from "sequelize";
import { UseCaseError } from "~/common/core/use-case.error.base";



export namespace GetAllPostUseCaseErrors {

  export class InvalidProperties extends Result<UseCaseError>{
    constructor(message: string = "there are some invalid properties", cause?: ExceptionBase){
      super(false, new ArgumentInvalidException(message, cause));
    }
  }

  export class FailBuildingPost extends Result<UseCaseError, ExceptionBase>{
    constructor(cause: ExceptionBase){
      super(false, cause);
    }
  }
}