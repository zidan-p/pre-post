import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { CreateUserDTOResponse } from "./create-user.dto";

export type CreateUserResponse = Either<
  AppError.UnexpectedError,
  Result<CreateUserDTOResponse>
>