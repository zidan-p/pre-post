import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { PublishManyOwnedPostsDTOResponse } from "./publish-many-owned-posts.dto";
import { PublishManyOwnedPostsUseCaseErrors } from "./publish-many-owned-posts.error";

export type PublishManyOwnedPostsResponse = Either<
  PublishManyOwnedPostsUseCaseErrors.FailBuilUser |
  PublishManyOwnedPostsUseCaseErrors.ForbiddenAccess |
  PublishManyOwnedPostsUseCaseErrors.IssueWhenBuilding |
  PublishManyOwnedPostsUseCaseErrors.SomePostNotFound |
  AppError.UnexpectedError,
  Result<PublishManyOwnedPostsDTOResponse>
>