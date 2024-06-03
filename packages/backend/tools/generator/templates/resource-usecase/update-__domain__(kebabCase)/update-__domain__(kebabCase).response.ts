import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { Update__domain__PascalCase__DTOResponse } from "./update-__domain__(kebabCase).dto";

export type Update__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<Update__domain__PascalCase__DTOResponse>
>