import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetListUserDTOResponse } from "./get-list-user.dto";
import {GetListUserUseCaseErrors} from "./get-list-user.error";

export type GetListUserResponse = Either<
  AppError.UnexpectedError,
  Result<GetListUserDTOResponse>
>