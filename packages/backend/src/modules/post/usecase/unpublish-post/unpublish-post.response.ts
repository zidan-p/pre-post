import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UnpublishPostDTOResponse } from "./unpublish-post.dto";
import { UnpublishPostUseCaseErrors } from "./unpublish-post.error";

export type UnpublishPostResponse = Either<
  UnpublishPostUseCaseErrors.ForbiddenUser | 
  UnpublishPostUseCaseErrors.PostNotFound | 
  AppError.UnexpectedError,
  Result<UnpublishPostDTOResponse>
>