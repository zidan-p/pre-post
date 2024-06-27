import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, NotFoundException } from "~/common/exceptions";



export namespace GetUserUseCaseErrors {
  export class InvalidUserIdValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message: string = "Invalid Provided Request"){
      super(false, new ArgumentInvalidException(message));
    }
  }

  export class userNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id: string | number){
      const message = "User with id [ " + id + " ] not found in database";
      super(false, new NotFoundException(message, undefined, {userId: id}));
    }
  }
}