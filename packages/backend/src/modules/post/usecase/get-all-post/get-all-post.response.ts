import { AppError } from "~/common/core/AppError";
import { Either, Result } from "~/common/core/Result";
import { GetAllPostUseCaseErrors } from "./get-all-post.error";
import { GetAllPostDTOResponse } from "./get-all-post.dto";




export type GetAllPostResponse = Either<
  GetAllPostUseCaseErrors.FailBuildingPost<any> |
  AppError.UnexpectedError,
  // Result<any> |
  Result<GetAllPostDTOResponse>
>