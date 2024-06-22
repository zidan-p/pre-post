import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateOwnedPostDTOResponse } from "./update-owned-post.dto";
import { UpdateOwnedPostUseCaseErrors } from "./update-owned-post.error";

export type UpdateOwnedPostResponse = Either<
  UpdateOwnedPostUseCaseErrors.FailBuildingPost|
  UpdateOwnedPostUseCaseErrors.UnauthorizeUser |
  UpdateOwnedPostUseCaseErrors.ForbiddenUser |
  UpdateOwnedPostUseCaseErrors.InvalidImageManagerProps |
  UpdateOwnedPostUseCaseErrors.InvalidImageProperties |
  UpdateOwnedPostUseCaseErrors.InvalidProperties |
  UpdateOwnedPostUseCaseErrors.PostNotFound |
  AppError.UnexpectedError,
  Result<UpdateOwnedPostDTOResponse>
>