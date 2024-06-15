import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ArgumentInvalidException, InternalServerErrorException, NotFoundException } from "~/common/exceptions";


export namespace PublishManyPostsUseCaseErrors {
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

  export class InvalidPostIdValue extends Result<UseCaseError, ArgumentInvalidException>{
    constructor(message: string = "Invalid Provided Request"){
      super(false, new ArgumentInvalidException(message));
    }
  }
}