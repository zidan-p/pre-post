import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateOwnedPostDTOResponse } from "./update-owned-post.dto";

export type UpdateOwnedPostResponse = Either<
  AppError.UnexpectedError,
  Result<UpdateOwnedPostDTOResponse>
>