import { Result } from "~/common/core/Result"
import { UseCaseError } from "~/common/core/UseCaseError"
import { ArgumentInvalidException } from "~/common/exceptions"

export namespace LoginUseCaseErrors {

  export class EmailOrPasswordError extends Result<UseCaseError> {    
    constructor () {
      super(false, new ArgumentInvalidException("Error with email or password"))
    }
  }

}