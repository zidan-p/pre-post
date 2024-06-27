import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteUserDTOResponse } from "./delete-user.dto";
import { DeleteUserUseCaseErrors } from "./delete-user.error";

export type DeleteUserResponse = Either<
  DeleteUserUseCaseErrors.InvalidUserIdValue | 
  DeleteUserUseCaseErrors.UserNotFound | 
  AppError.UnexpectedError,
  Result<DeleteUserDTOResponse>
>