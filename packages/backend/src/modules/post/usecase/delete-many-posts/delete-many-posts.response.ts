import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteManyPostsDTOResponse } from "./delete-many-posts.dto";

export type DeleteManyPostsResponse = Either<
  AppError.UnexpectedError,
  Result<DeleteManyPostsDTOResponse>
>