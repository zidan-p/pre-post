import { Result } from "~/common/core/result";
import { UseCaseError } from "~/common/core/use-case.error.base";
import { NotFoundException } from "~/common/exceptions";



export namespace GetPublishedPostByOwnerUseCaseErrors {
  export class OwnerNotFound extends Result<UseCaseError, NotFoundException>{
    constructor(id: string | number){
      const message = "Owner with id : " + id + " not found";
      super(false, new NotFoundException(message, undefined, {ownerId: id}));
    }
  }
}