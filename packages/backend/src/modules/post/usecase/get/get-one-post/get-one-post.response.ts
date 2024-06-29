import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetOnePostDTOResponse } from "./get-one-post.dto";
import { GetOnePostUseCaseErrors } from "./get-one-post.error";

export type GetOnePostResponse = Either<
  GetOnePostUseCaseErrors.ForbiddenAccess | 
  GetOnePostUseCaseErrors.InvalidId | 
  GetOnePostUseCaseErrors.PostNotFound | 
  GetOnePostUseCaseErrors.UserNotFound | 
  AppError.UnexpectedError,
  Result<GetOnePostDTOResponse>
>