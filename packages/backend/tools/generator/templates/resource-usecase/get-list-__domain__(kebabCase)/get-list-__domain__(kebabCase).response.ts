import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetList__domain__PascalCase__DTOResponse } from "./get-list-__domain__(kebabCase).dto";
import {GetList__domain__PascalCase__UseCaseErrors} from "./get-list-__domain__(kebabCase).error";

export type GetList__domain__PascalCase__Response = Either<
  AppError.UnexpectedError,
  Result<GetList__domain__PascalCase__DTOResponse>
>