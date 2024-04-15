import { AppError } from "~/common/core/AppError";
import { Either, Result } from "~/common/core/Result";
import { CreatePostDTOResponse } from "./create-post.dto";
import { CreatePostUseCaseErrors } from "./create-post.error";




export type CreatePostResponse = Either<
  CreatePostUseCaseErrors.InvalidImageProperties |
  AppError.UnexpectedError,
  Result<any> |
  Result<CreatePostDTOResponse>
>