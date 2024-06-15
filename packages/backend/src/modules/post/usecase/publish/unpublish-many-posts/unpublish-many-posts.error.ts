import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, InternalServerErrorException, NotFoundException } from "~/common/exceptions";



export namespace UnpublishManyPostsUseCaseErrors {

  export class InvalidPostIdValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(idValue: any = ""){
      super(false, new ArgumentInvalidException("invalid id list value [ " + idValue + " ]", undefined, {postIds: idValue}));
    }
  }

  export class SomePostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(ids: string[] | number[]){
      const message = "Post With id [ " + ids.join(", ") + " ] not found ";
      super(false, new NotFoundException(message));
    }
  }
  export class IssueWhenBuilding extends Result<UseCaseError, InternalServerErrorException>{
    constructor(message: string = "Issue when building process"){
      super(false, new InternalServerErrorException(message));
    }
  }
}