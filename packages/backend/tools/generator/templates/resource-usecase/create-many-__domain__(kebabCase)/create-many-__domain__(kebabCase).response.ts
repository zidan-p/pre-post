import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { CreateMany__domain__PascalCase__DTOResponse } from "./create-many-__domain__(kebabCase).dto";

export type CreateMany__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<CreateMany__domain__PascalCase__DTOResponse>
>