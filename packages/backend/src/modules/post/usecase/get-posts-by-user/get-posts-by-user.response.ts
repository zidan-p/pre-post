import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPostsByUserDTOResponse } from "./get-posts-by-user.dto";

export type GetPostsByUserResponse = Either<
  AppError.UnexpectedError,
  Result<GetPostsByUserDTOResponse>
>