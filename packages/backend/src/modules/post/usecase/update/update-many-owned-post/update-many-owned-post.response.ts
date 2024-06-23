import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateManyOwnedPostDTOResponse } from "./update-many-owned-post.dto";

export type UpdateManyOwnedPostResponse = Either<
  AppError.UnexpectedError,
  Result<UpdateManyOwnedPostDTOResponse>
>