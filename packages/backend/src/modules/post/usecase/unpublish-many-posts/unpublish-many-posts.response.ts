import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UnpublishManyPostsDTOResponse } from "./unpublish-many-posts.dto";

export type UnpublishManyPostsResponse = Either<
  AppError.UnexpectedError,
  Result<UnpublishManyPostsDTOResponse>
>