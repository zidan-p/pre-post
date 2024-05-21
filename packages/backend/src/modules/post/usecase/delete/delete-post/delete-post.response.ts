import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeletePostDTOResponse } from "./delete-post.dto";
import { DeletePostUseCaseErrors } from "./delete-post.error";

export type DeletePostResponse = Either<
  DeletePostUseCaseErrors.PostNotFound |
  AppError.UnexpectedError,
  Result<DeletePostDTOResponse>
>