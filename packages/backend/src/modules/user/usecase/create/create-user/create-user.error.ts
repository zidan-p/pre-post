import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, ArgumentNotProvidedException, ConflictException, ExceptionBase } from "~/common/exceptions";


export namespace CreateUserUseCaseErrors {

  export class FieldNotProvided extends Result<UseCaseError, ArgumentNotProvidedException>{
    constructor(message: string = "field not provided", field?: string){
      super(false, new ArgumentNotProvidedException(message, undefined, {field}));
    }
  }

  export class UserAlreadyExists extends Result<UseCaseError, ConflictException>{
    constructor(message = "this specific user already exist", field: string, value: string){
      super(false, new ConflictException(message, undefined, {field, value}));
    }
  }

  export class InvalidProperties extends Result<UseCaseError>{
    constructor(message: string = "there are some invalid properties", cause?: ExceptionBase){
      super(false, new ArgumentInvalidException(message, cause));
    }
  }

  export class FailBuildingUser extends Result<UseCaseError, ExceptionBase>{
    constructor(cause: ExceptionBase){
      super(false, cause);
    }
  }
}