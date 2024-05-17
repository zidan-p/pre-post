import { AppError } from "~/common/core/AppError";
import { Either, Result } from "~/common/core/Result";
import { DeletePostUseCaseErrors } from "./delete-post.error";
import { DeletePostDTOResponse } from "./delete-post.dto";




export type DeletePostResponse = Either<
  DeletePostUseCaseErrors.PostNotFound |
  AppError.UnexpectedError,
  // Result<any> |
  Result<DeletePostDTOResponse>
>