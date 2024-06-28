import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, InternalServerErrorException, NotFoundException } from "~/common/exceptions";


export namespace UpdateManyUserUseCaseErrors {
  export class SomeUserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(ids: string[] | number[]){
      const message = "User With id [ " + ids.join(", ") + " ] not found ";
      super(false, new NotFoundException(message));
    }
  }

  export class IssueWhenBuilding extends Result<UseCaseError, InternalServerErrorException>{
    constructor(message: string = "Issue when building process"){
      super(false, new InternalServerErrorException(message));
    }
  }

  export class InvalidFieldValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message: string = "Invalid Provided Request", metadata: any){
      super(false, new ArgumentInvalidException(message, undefined, metadata));
    }
  }

  export class InvalidUserIdValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message: string = "Invalid Provided Request"){
      super(false, new ArgumentInvalidException(message));
    }
  }

  export class InvalidOperation extends Result<UseCaseError, InternalServerErrorException>{
    constructor(message: string = "Invalid Operation"){
      super(false, new InternalServerErrorException(message));
    }
  }
}