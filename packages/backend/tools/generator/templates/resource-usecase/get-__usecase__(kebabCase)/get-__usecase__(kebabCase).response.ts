import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { Get__usecase__PascalCase__DTOResponse } from "./get-__usecase__(kebabCase).dto";

export type Get__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<Get__usecase__PascalCase__DTOResponse>
>