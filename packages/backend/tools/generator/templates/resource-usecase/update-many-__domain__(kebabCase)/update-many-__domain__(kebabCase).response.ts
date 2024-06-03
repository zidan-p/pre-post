import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateMany__domain__PascalCase__DTOResponse } from "./update-many-__domain__(kebabCase).dto";

export type UpdateMany__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<UpdateMany__domain__PascalCase__DTOResponse>
>