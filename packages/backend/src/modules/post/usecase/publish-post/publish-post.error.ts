import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ForbiddenException, NotFoundException } from "~/common/exceptions";



export namespace PublishPostUseCaseErrors {

  export class PostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id: string | number){
      const message = "Post With id [ " + id + " ] nto found ";
      super(false, new NotFoundException(message, undefined, {postId: id}));
    }
  }

  export class ForbiddenUser extends Result<UseCaseError, ForbiddenException>{
    constructor(id: string | number){
      const message = "User with id : " + id + " can't access to publish this image";
      super(false, new ForbiddenException(message));
    }
  }

}