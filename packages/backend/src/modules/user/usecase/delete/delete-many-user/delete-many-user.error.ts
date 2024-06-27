import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, ExceptionBase, InternalServerErrorException, NotFoundException } from "~/common/exceptions";

export namespace DeleteManyUserUseCaseErrors {
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

  export class InvalidUserIdValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(idValue: any){
      super(false, new ArgumentInvalidException("invalid user id value", undefined, {userIds: idValue}));
    }
  }

  export class DeleteOperationFailed extends Result<UseCaseError, ExceptionBase>{
    constructor(exception: ExceptionBase){
      super(false, exception);
    }
  }
}