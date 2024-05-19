import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPostsByCurrentUserDTOResponse } from "./get-posts-by-current-user.dto";

export type GetPostsByCurrentUserResponse = Either<
  AppError.UnexpectedError,
  Result<GetPostsByCurrentUserDTOResponse>
>