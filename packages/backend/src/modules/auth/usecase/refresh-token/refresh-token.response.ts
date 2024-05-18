import { Either, Result } from "~/common/core/result";
import { RefresTokenUseCaseError } from "./refresh-token.error";
import { RefreshTokenResponseDTO } from "./refresh-token.dto";
import { AppError } from "~/common/core/app.error";
import { ExceptionBase } from "~/common/exceptions";




export type RefresTokenResponse = Either<
  RefresTokenUseCaseError.ExpireRefreshToken |
  RefresTokenUseCaseError.MalformedToken |
  RefresTokenUseCaseError.UserNotFound |
  AppError.UnexpectedError,
  Result<any> |
  Result<RefreshTokenResponseDTO>
>