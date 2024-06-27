import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetUserDTOResponse } from "./get-user.dto";
import { GetUserUseCaseErrors } from "./get-user.error";

export type GetUserResponse = Either<
  GetUserUseCaseErrors.InvalidUserIdValue | 
  GetUserUseCaseErrors.userNotFound | 
  AppError.UnexpectedError,
  Result<GetUserDTOResponse>
>