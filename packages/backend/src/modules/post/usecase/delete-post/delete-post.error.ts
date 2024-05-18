import { Result } from "~/common/core/result";
import { ArgumentInvalidException, ExceptionBase, NotFoundException } from "~/common/exceptions";
import { UseCaseError } from "~/common/core/UseCaseError";
import { BaseError } from "sequelize";



export namespace DeletePostUseCaseErrors {

  export class PostNotFound extends Result<UseCaseError>{
    constructor(message: string = "there are some invalid properties", cause?: ExceptionBase){
      super(false, new NotFoundException(message));
    }
  }
}