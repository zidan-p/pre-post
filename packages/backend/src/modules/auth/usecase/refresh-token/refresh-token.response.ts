import { Either, Result } from "~/common/core/Result";
import { RefresTokenUseCaseError } from "./refresh-token.error";
import { RefreshTokenResponseDTO } from "./refresh-token.dto";
import { AppError } from "~/common/core/AppError";




export type RefresTokenResponse = Either<
  RefresTokenUseCaseError.ExpireRefreshToken |
  RefresTokenUseCaseError.MalformedToken |
  RefresTokenUseCaseError.UserNotFound |
  AppError.UnexpectedError,
  Result<any> |
  Result<RefreshTokenResponseDTO>
>