import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPostsByCurrentUserDTOResponse } from "./get-posts-by-current-user.dto";
import { GetPostsByCurrentUserUseCaseErrors } from "./get-posts-by-current-user.error";

export type GetPostsByCurrentUserResponse = Either<
  GetPostsByCurrentUserUseCaseErrors.UserNotFound | 
  GetPostsByCurrentUserUseCaseErrors.PostNotFound | 
  AppError.UnexpectedError,
  Result<GetPostsByCurrentUserDTOResponse>
>