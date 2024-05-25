import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { Create__usecase__PascalCase__DTOResponse } from "./create-__usecase__(kebabCase).dto";

export type Create__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<Create__usecase__PascalCase__DTOResponse>
>