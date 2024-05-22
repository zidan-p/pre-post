import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPublishedPostByOwnerDTOResponse } from "./get-published-post-by-owner.dto";
import { GetPublishedPostByOwnerUseCaseErrors } from "./get-published-post-by-owner.error";

export type GetPublishedPostByOwnerResponse = Either<
  GetPublishedPostByOwnerUseCaseErrors.OwnerNotFound |
  AppError.UnexpectedError,
  Result<GetPublishedPostByOwnerDTOResponse>
>