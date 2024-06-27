import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, NotFoundException } from "~/common/exceptions";


export namespace DeleteUserUseCaseErrors {
  export class InvalidUserIdValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(idValue: any){
      super(false, new ArgumentInvalidException("invalid user id value", undefined, {userIds: idValue}));
    }
  }

  export class UserNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(userId: string | number){
      super(false, new NotFoundException("user with id [ " + userId + " ] not found", undefined, {userId}));
    }
  }
}