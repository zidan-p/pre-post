import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { Delete__domain__PascalCase__DTOResponse } from "./delete-__domain__(kebabCase).dto";

export type Delete__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<Delete__domain__PascalCase__DTOResponse>
>