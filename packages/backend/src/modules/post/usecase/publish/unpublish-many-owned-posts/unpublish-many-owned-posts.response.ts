import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UnpublishManyOwnedPostsDTOResponse } from "./unpublish-many-owned-posts.dto";

export type UnpublishManyOwnedPostsResponse = Either<
  AppError.UnexpectedError,
  Result<UnpublishManyOwnedPostsDTOResponse>
>