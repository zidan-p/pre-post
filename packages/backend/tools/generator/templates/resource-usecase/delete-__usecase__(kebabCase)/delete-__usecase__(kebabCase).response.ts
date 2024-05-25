import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { Delete__usecase__PascalCase__DTOResponse } from "./delete-__usecase__(kebabCase).dto";

export type Delete__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<Delete__usecase__PascalCase__DTOResponse>
>