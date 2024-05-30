import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, ExceptionBase } from "~/common/exceptions";



export namespace GetAllPostListUseCaseErrors {
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