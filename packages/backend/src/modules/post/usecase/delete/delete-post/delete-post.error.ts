import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { NotFoundException } from "~/common/exceptions";



export namespace DeletePostUseCaseErrors {

  export class PostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id: string | number){
      const message = "Post With id [ " + id + " ] nto found ";
      super(false, new NotFoundException(message));
    }
  }
}