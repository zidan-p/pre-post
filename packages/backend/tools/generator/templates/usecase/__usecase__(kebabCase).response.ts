import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { __usecase__PascalCase__DTOResponse } from "./__usecase__(kebabCase).dto";

export type __usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<__usecase__PascalCase__DTOResponse>
>