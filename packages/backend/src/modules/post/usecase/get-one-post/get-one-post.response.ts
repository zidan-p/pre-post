import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetOnePostDTOResponse } from "./get-one-post.dto";

export type GetOnePostResponse = Either<
  AppError.UnexpectedError,
  Result<GetOnePostDTOResponse>
>