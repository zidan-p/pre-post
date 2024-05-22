import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { PublishManyOwnedPostsDTOResponse } from "./publish-many-owned-posts.dto";

export type PublishManyOwnedPostsResponse = Either<
  AppError.UnexpectedError,
  Result<PublishManyOwnedPostsDTOResponse>
>