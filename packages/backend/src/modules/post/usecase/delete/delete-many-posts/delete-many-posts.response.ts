import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteManyPostsDTOResponse } from "./delete-many-posts.dto";
import { DeleteManyPostsUseCaseErrors } from "./delete-many-posts.error";

export type DeleteManyPostsResponse = Either<
  DeleteManyPostsUseCaseErrors.SomePostNotFound |
  AppError.UnexpectedError,
  Result<DeleteManyPostsDTOResponse>
>