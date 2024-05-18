import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { PublishPostDTOResponse } from "./publish-post.dto";
import { PublishPostUseCaseErrors } from "./publish-post.error";

export type PublishPostResponse = Either<
  PublishPostUseCaseErrors.PostNotFound |
  AppError.UnexpectedError,
  Result<PublishPostDTOResponse>
>