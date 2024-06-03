import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { Create__domain__PascalCase__DTOResponse } from "./create-__domain__(kebabCase).dto";

export type Create__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<Create__domain__PascalCase__DTOResponse>
>