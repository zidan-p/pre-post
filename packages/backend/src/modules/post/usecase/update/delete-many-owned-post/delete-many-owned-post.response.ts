import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteManyOwnedPostDTOResponse } from "./delete-many-owned-post.dto";

export type DeleteManyOwnedPostResponse = Either<
  AppError.UnexpectedError,
  Result<DeleteManyOwnedPostDTOResponse>
>