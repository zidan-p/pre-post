import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UnpublishPostDTOResponse } from "./unpublish-post.dto";

export type UnpublishPostResponse = Either<
  AppError.UnexpectedError,
  Result<UnpublishPostDTOResponse>
>