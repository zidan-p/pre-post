import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteManyUserDTOResponse } from "./delete-many-user.dto";

export type DeleteManyUserResponse = Either<
  AppError.UnexpectedError,
  Result<DeleteManyUserDTOResponse>
>