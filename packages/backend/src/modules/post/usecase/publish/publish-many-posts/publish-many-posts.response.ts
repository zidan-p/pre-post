import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { PublishManyPostsDTOResponse } from "./publish-many-posts.dto";

export type PublishManyPostsResponse = Either<
  AppError.UnexpectedError,
  Result<PublishManyPostsDTOResponse>
>