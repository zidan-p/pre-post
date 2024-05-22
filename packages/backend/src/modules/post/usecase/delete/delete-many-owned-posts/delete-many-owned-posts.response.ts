import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteManyOwnedPostsDTOResponse } from "./delete-many-owned-posts.dto";
import { DeleteManyOwnedPostsUseCaseErrors } from "./delete-many-owned-posts.error";

export type DeleteManyOwnedPostsResponse = Either<
  DeleteManyOwnedPostsUseCaseErrors.FailBuilUser | 
  DeleteManyOwnedPostsUseCaseErrors.ForbiddenAccess | 
  DeleteManyOwnedPostsUseCaseErrors.IssueWhenBuilding | 
  DeleteManyOwnedPostsUseCaseErrors.SomePostNotFound | 
  AppError.UnexpectedError,
  Result<DeleteManyOwnedPostsDTOResponse>
>