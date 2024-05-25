import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteOwnedPostDTOResponse } from "./delete-owned-post.dto";
import { DeleteOwnedPostUseCaseErrors } from "./delete-owned-post.error";

export type DeleteOwnedPostResponse = Either<
  DeleteOwnedPostUseCaseErrors.ForbiddenUser |
  DeleteOwnedPostUseCaseErrors.UserNotFound |
  AppError.UnexpectedError,
  Result<DeleteOwnedPostDTOResponse>
>