import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateUserDTOResponse } from "./update-user.dto";
import { UpdateUserUseCaseErrors } from "./update-user.error";

export type UpdateUserResponse = Either<
  UpdateUserUseCaseErrors.UserNotFound |
  UpdateUserUseCaseErrors.InvalidFieldValue |
  UpdateUserUseCaseErrors.InvalidOperation |
  UpdateUserUseCaseErrors.IssueWhenBuilding |
  AppError.UnexpectedError,
  Result<UpdateUserDTOResponse>
>