import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateMany__usecase__PascalCase__DTOResponse } from "./update-many-__usecase__(kebabCase).dto";

export type UpdateMany__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<UpdateMany__usecase__PascalCase__DTOResponse>
>