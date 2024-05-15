import { AppError } from "~/common/core/AppError";
import { Either, Result } from "~/common/core/Result";
import { CreatePostDTOResponse } from "./get-all-post.dto";
import { CreatePostUseCaseErrors } from "./get-all-post.error";
import { ExceptionBase } from "~/common/exceptions";
import { PostDomainErrors } from "../../domain/exceptions/post.exception";




export type CreatePostResponse = Either<
  CreatePostUseCaseErrors.InvalidImageProperties |
  AppError.UnexpectedError,
  Result<any> |
  Result<CreatePostDTOResponse>
>