import { AppError } from "~/common/core/app.error";
import { Either, Result } from "~/common/core/result";
import { GetAllPostUseCaseErrors } from "./get-all-post.error";
import { GetAllPostDTOResponse } from "./get-all-post.dto";




export type GetAllPostResponse = Either<
  // GetAllPostUseCaseErrors.InvalidProperties |
  // GetAllPostUseCaseErrors.FailBuildingPost<any> |
  AppError.UnexpectedError,
  // Result<any> |
  Result<GetAllPostDTOResponse>
>