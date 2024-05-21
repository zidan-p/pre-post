import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { ForbiddenException, NotFoundException } from "~/common/exceptions";



export namespace UnpublishPostUseCaseErrors {
  export class PostNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(postId: string | number){
      const message = "Post With postId [ " + postId + " ] nto found ";
      super(false, new NotFoundException(message, undefined, {postId: postId}));
    }
  }

  export class NotFoundUser extends Result<UseCaseError, NotFoundException>{
    constructor(id: string | number){
      const message = "Auth user with id : " + id + " not found";
      super(false, new NotFoundException(message, undefined, {userId: id}));
    }
  }

  export class ForbiddenUser extends Result<UseCaseError, ForbiddenException>{
    constructor(userId: string | number){
      const message = "User with id : " + userId + " can't access to publish this image";
      super(false, new ForbiddenException(message, undefined));
    }
  }
}