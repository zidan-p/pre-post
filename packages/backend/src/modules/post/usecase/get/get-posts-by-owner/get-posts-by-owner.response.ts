import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPostsByOwnerDTOResponse } from "./get-posts-by-owner.dto";
import { GetPostsByOwnerUseCaseErrors } from "./get-posts-by-owner.error";

export type GetPostsByOwnerResponse = Either<
  GetPostsByOwnerUseCaseErrors.OwnerNotFound | 
  AppError.UnexpectedError,
  Result<GetPostsByOwnerDTOResponse>
>