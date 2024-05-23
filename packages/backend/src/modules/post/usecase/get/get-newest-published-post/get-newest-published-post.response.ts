import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetNewestPublishedPostDTOResponse } from "./get-newest-published-post.dto";

export type GetNewestPublishedPostResponse = Either<
  AppError.UnexpectedError,
  Result<GetNewestPublishedPostDTOResponse>
>