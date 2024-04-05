import { Result } from "~/common/core/Result";
import { UseCaseError } from "~/common/core/UseCaseError";
import { ExpiredException } from "~/common/exceptions";



export namespace RefresTokenUseCaseError{

  export class ExpireRefreshToken extends Result<UseCaseError>{
    constructor(message: "Your Token already expire"){
      super(false, new ExpiredException(message));
    }
  }
}