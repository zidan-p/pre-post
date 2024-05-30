import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetAllPostListDTOResponse } from "./get-all-post-list.dto";
import { GetAllPostListUseCaseErrors } from "./get-all-post-list.error";

export type GetAllPostListResponse = Either<
  GetAllPostListUseCaseErrors.FailBuildingPost | 
  GetAllPostListUseCaseErrors.InvalidProperties | 
  AppError.UnexpectedError,
  Result<GetAllPostListDTOResponse>
>