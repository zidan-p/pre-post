import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UnpublishManyOwnedPostsDTOResponse } from "./unpublish-many-owned-posts.dto";
import { UnpublishManyOwnedPostsUseCaseErrors } from "./unpublish-many-owned-posts.error";
import { PostOwnershipServiceErrors } from "~/modules/post/domain/service/post-ownership.service";

export type UnpublishManyOwnedPostsResponse = Either<
  PostOwnershipServiceErrors.NotOwnedByUser |
  PostOwnershipServiceErrors.SomePostNotFound |
  UnpublishManyOwnedPostsUseCaseErrors.FailBuilUser |
  UnpublishManyOwnedPostsUseCaseErrors.ForbiddenAccess |
  UnpublishManyOwnedPostsUseCaseErrors.IssueWhenBuilding |
  UnpublishManyOwnedPostsUseCaseErrors.SomePostNotFound |
  UnpublishManyOwnedPostsUseCaseErrors.UserNotFound |
  AppError.UnexpectedError,
  Result<UnpublishManyOwnedPostsDTOResponse>
>