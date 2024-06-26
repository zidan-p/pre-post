import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateUserDTOResponse } from "./update-user.dto";

export type UpdateUserResponse = Either<
  AppError.UnexpectedError,
  Result<UpdateUserDTOResponse>
>