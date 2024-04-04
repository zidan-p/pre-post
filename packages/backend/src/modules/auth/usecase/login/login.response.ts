import { Either, Result } from "~/common/core/Result";
import { LoginUseCaseErrors } from "./login.error";
import { LoginDTOResponse } from "./login.dto";




export type LoginResponse = Either<
  LoginUseCaseErrors.EmailOrPasswordError |
  LoginUseCaseErrors.LoginValidationError,
  Result<any> |
  Result<LoginDTOResponse>
>