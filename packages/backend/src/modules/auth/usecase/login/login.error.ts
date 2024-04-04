import { Result } from "~/common/core/Result"
import { UseCaseError } from "~/common/core/UseCaseError"
import { ArgumentInvalidException} from "~/common/exceptions"

export namespace LoginUseCaseErrors {

  export class EmailOrPasswordError extends Result<UseCaseError> {    
    constructor (message: string = "Error with email or password") {
      super(false, new ArgumentInvalidException(message))
    }
  }

  export class LoginValidationError extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(error: ArgumentInvalidException){
      super(false, error);
    }
  }

}