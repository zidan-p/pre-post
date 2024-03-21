import { Result } from "~/common/core/Result"
import { UseCaseError } from "~/common/core/UseCaseError"

export namespace LoginUseCaseErrors {

  export class EmailOrPasswordError extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `Error woth email or password`
      } as UseCaseError)
    }
  }

}