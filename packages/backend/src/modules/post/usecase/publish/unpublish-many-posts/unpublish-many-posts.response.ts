import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UnpublishManyPostsDTOResponse } from "./unpublish-many-posts.dto";
import { UnpublishManyPostsUseCaseErrors } from "./unpublish-many-posts.error";

export type UnpublishManyPostsResponse = Either<
  UnpublishManyPostsUseCaseErrors.SomePostNotFound |
  UnpublishManyPostsUseCaseErrors.IssueWhenBuilding |
  AppError.UnexpectedError,
  Result<UnpublishManyPostsDTOResponse>
>