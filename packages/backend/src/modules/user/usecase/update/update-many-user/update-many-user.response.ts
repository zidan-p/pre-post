import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateManyUserDTOResponse } from "./update-many-user.dto";
import { UpdateManyUserUseCaseErrors } from "./update-many-user.error";

export type UpdateManyUserResponse = Either< 
  UpdateManyUserUseCaseErrors.InvalidUserIdValue |
  UpdateManyUserUseCaseErrors.IssueWhenBuilding |
  UpdateManyUserUseCaseErrors.SomeUserNotFound |
  AppError.UnexpectedError,
  Result<UpdateManyUserDTOResponse>
>