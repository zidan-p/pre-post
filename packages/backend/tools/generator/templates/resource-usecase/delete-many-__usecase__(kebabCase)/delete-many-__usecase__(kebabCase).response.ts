import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { DeleteMany__usecase__PascalCase__DTOResponse } from "./delete-many-__usecase__(kebabCase).dto";

export type DeleteMany__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<DeleteMany__usecase__PascalCase__DTOResponse>
>