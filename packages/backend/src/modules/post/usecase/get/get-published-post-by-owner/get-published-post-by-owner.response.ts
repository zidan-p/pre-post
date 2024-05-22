import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPublishedPostByOwnerDTOResponse } from "./get-published-post-by-owner.dto";

export type GetPublishedPostByOwnerResponse = Either<
  AppError.UnexpectedError,
  Result<GetPublishedPostByOwnerDTOResponse>
>