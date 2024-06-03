import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteMany__domain__PascalCase__DTOResponse } from "./delete-many-__domain__(kebabCase).dto";

export type DeleteMany__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<DeleteMany__domain__PascalCase__DTOResponse>
>