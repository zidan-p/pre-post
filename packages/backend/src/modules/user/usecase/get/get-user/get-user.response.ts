import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetUserDTOResponse } from "./get-user.dto";

export type GetUserResponse = Either<
  AppError.UnexpectedError,
  Result<GetUserDTOResponse>
>