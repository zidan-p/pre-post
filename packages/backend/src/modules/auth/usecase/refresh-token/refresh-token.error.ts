import { Result } from "~/common/core/Result";
import { UseCaseError } from "~/common/core/UseCaseError";
import { ExpiredException, NotFoundException } from "~/common/exceptions";



export namespace RefresTokenUseCaseError{

  export class ExpireRefreshToken extends Result<UseCaseError, ExpiredException>{
    constructor(message?: "Your Token already expire"){
      super(false, new ExpiredException(message));
    }
  }

  export class UserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id?: string | number, message?: "user not found"){
      super(false, new NotFoundException(message));
    }
  }
}