import { AppError } from "~/common/core/app.error";
import { Either, Result } from "~/common/core/result";
import { CreatePostDTOResponse } from "./create-post.dto";
import { CreatePostUseCaseErrors } from "./create-post.error";
import { ExceptionBase } from "~/common/exceptions";
import { PostDomainErrors } from "../../domain/exceptions/post.exception";




export type CreatePostResponse = Either<
  CreatePostUseCaseErrors.InvalidImageProperties |
  AppError.UnexpectedError,
  // Result<any> |
  Result<CreatePostDTOResponse>
>