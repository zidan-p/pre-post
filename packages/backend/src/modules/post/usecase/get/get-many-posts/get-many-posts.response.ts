import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetManyPostsDTOResponse } from "./get-many-posts.dto";
import { GetManyPostsUseCaseErrors } from "./get-many-posts.error";

export type GetManyPostsResponse = Either<
  GetManyPostsUseCaseErrors.SomePostNotFound |
  AppError.UnexpectedError,
  Result<GetManyPostsDTOResponse>
>