import { Result } from "~/common/core/Result";
import { CreatePostDTOResponse } from "./create-post.dto";
import { ArgumentInvalidException, ExceptionBase } from "~/common/exceptions";
import { UseCaseError } from "~/common/core/UseCaseError";



export namespace CreatePostUseCaseErrors {

  export class InvalidImageProperties extends Result<UseCaseError, ArgumentInvalidException>{
    constructor( cause: ArgumentInvalidException){
      super(false, cause);
    }
  }
}