import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetList__usecase__PascalCase__DTOResponse } from "./get-list-__usecase__(kebabCase).dto";
import {GetList__usecase__PascalCase__UseCaseErrors} from "./get-list-__usecase__(kebabCase).error";

export type GetList__usecase__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<GetList__usecase__PascalCase__DTOResponse>
>