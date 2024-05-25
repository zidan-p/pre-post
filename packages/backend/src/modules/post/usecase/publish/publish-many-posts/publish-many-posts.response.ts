import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { PublishManyPostsDTOResponse } from "./publish-many-posts.dto";
import { PublishManyPostsUseCaseErrors } from "./publish-many-posts.error";

export type PublishManyPostsResponse = Either<
  PublishManyPostsUseCaseErrors.IssueWhenBuilding | 
  PublishManyPostsUseCaseErrors.SomePostNotFound | 
  AppError.UnexpectedError,
  Result<PublishManyPostsDTOResponse>
>