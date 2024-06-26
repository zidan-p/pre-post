import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { CreateUserDTOResponse } from "./create-user.dto";
import { CreateUserUseCaseErrors } from "./create-user.error";

export type CreateUserResponse = Either<
  CreateUserUseCaseErrors.FailBuildingUser |
  CreateUserUseCaseErrors.FieldNotProvided |
  CreateUserUseCaseErrors.UserAlreadyExists |
  CreateUserUseCaseErrors.InvalidProperties |
  AppError.UnexpectedError,
  Result<CreateUserDTOResponse>
>