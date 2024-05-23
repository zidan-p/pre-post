import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetAllPublishedPostsDTOResponse } from "./get-all-published-posts.dto";

export type GetAllPublishedPostsResponse = Either<
  AppError.UnexpectedError,
  Result<GetAllPublishedPostsDTOResponse>
>