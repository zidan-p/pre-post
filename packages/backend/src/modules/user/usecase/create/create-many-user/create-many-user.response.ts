import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { CreateManyUserDTOResponse } from "./create-many-user.dto";

export type CreateManyUserResponse = Either<
  AppError.UnexpectedError,
  Result<CreateManyUserDTOResponse>
>