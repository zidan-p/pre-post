import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateManyUserDTOResponse } from "./update-many-user.dto";

export type UpdateManyUserResponse = Either<
  AppError.UnexpectedError,
  Result<UpdateManyUserDTOResponse>
>