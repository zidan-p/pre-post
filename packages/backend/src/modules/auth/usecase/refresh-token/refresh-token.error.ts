import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, ExpiredException, NotFoundException } from "~/common/exceptions";



export namespace RefresTokenUseCaseError{

  export class MalformedToken extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message = "Malformed token"){
      super(false, new ArgumentInvalidException(message));
    }
  }

  export class ExpireRefreshToken extends Result<UseCaseError, ExpiredException>{
    constructor(message ="Your Token already expire"){
      super(false, new ExpiredException(message));
    }
  }

  export class UserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id?: string | number, message = "user not found"){
      super(false, new NotFoundException(message));
    }
  }
}