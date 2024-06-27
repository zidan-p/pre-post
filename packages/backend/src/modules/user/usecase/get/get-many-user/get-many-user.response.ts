import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetManyUserDTOResponse } from "./get-many-user.dto";
import { GetManyUserUseCaseErrors } from "./get-many-user.error";

export type GetManyUserResponse = Either<
  GetManyUserUseCaseErrors.InvalidUserIdValue | 
  GetManyUserUseCaseErrors.IssueWhenBuilding | 
  GetManyUserUseCaseErrors.SomeUserNotFound | 
  AppError.UnexpectedError,
  Result<GetManyUserDTOResponse>
>