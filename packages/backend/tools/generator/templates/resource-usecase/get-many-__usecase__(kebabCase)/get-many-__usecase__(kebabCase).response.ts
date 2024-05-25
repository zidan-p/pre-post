import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetMany__usecase__PascalCase__DTOResponse } from "./get-many-__usecase__(kebabCase).dto";

export type GetMany__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<GetMany__usecase__PascalCase__DTOResponse>
>