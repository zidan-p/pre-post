import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetMany__domain__PascalCase__DTOResponse } from "./get-many-__domain__(kebabCase).dto";

export type GetMany__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<GetMany__domain__PascalCase__DTOResponse>
>