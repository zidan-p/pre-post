import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { Get__domain__PascalCase__DTOResponse } from "./get-__domain__(kebabCase).dto";

export type Get__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<Get__domain__PascalCase__DTOResponse>
>