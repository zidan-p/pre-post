import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetManyUserDTOResponse } from "./get-many-user.dto";

export type GetManyUserResponse = Either<
  AppError.UnexpectedError,
  Result<GetManyUserDTOResponse>
>