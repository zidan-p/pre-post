import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteUserDTOResponse } from "./delete-user.dto";

export type DeleteUserResponse = Either<
  AppError.UnexpectedError,
  Result<DeleteUserDTOResponse>
>