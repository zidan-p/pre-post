import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, InternalServerErrorException, NotFoundException } from "~/common/exceptions";



export namespace UpdateUserUseCaseErrors {
  export class UserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id: string){
      const message = "User With id [ " + id + " ] not found ";
      super(false, new NotFoundException(message));
    }
  }

  export class IssueWhenBuilding extends Result<UseCaseError, InternalServerErrorException>{
    constructor(message: string = "Issue when building process"){
      super(false, new InternalServerErrorException(message));
    }
  }

  export class InvalidFieldValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message: string = "Invalid Provided Request", field: string, value: string){
      super(false, new ArgumentInvalidException(message, undefined, {field, value}));
    }
  }

  export class InvalidUserIdValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message: string = "Invalid Provided Request", userId: any){
      super(false, new ArgumentInvalidException(message, undefined, {field: "userId", value: message}));
    }
  }

  export class InvalidOperation extends Result<UseCaseError, InternalServerErrorException>{
    constructor(message: string = "Invalid Operation"){
      super(false, new InternalServerErrorException(message));
    }
  }
}