import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { CreateMany__usecase__PascalCase__DTOResponse } from "./create-many-__usecase__(kebabCase).dto";

export type CreateMany__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<CreateMany__usecase__PascalCase__DTOResponse>
>