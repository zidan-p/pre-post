import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { Update__usecase__PascalCase__DTOResponse } from "./update-__usecase__(kebabCase).dto";

export type Update__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<Update__usecase__PascalCase__DTOResponse>
>