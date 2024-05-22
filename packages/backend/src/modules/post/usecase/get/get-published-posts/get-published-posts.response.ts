import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPublishedPostsDTOResponse } from "./get-published-posts.dto";

export type GetPublishedPostsResponse = Either<
  AppError.UnexpectedError,
  Result<GetPublishedPostsDTOResponse>
>