import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetNewestPostDTOResponse } from "./get-newest-post.dto";

export type GetNewestPostResponse = Either<
  AppError.UnexpectedError,
  Result<GetNewestPostDTOResponse>
>