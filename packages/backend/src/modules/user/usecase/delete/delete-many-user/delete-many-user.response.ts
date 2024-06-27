import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteManyUserDTOResponse } from "./delete-many-user.dto";
import { DeleteManyUserUseCaseErrors } from "./delete-many-user.error";

export type DeleteManyUserResponse = Either<
  DeleteManyUserUseCaseErrors.DeleteOperationFailed |
  DeleteManyUserUseCaseErrors.IssueWhenBuilding |
  DeleteManyUserUseCaseErrors.SomeUserNotFound |
  AppError.UnexpectedError,
  Result<DeleteManyUserDTOResponse>
>