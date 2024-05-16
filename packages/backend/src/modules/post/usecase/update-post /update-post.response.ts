import { AppError } from "~/common/core/AppError";
import { Either, Result } from "~/common/core/Result";
import { ExceptionBase } from "~/common/exceptions";
import { PostDomainErrors } from "../../domain/exceptions/post.exception";
import { UpdatePostUseCaseErrors } from "./update-post.error";
import { UpdatePostDTOResponse } from "./update-post.dto";




export type UpdatePostResponse = Either<
  UpdatePostUseCaseErrors.InvalidImageProperties |
  AppError.UnexpectedError,
  // Result<any> |
  Result<UpdatePostDTOResponse>
>