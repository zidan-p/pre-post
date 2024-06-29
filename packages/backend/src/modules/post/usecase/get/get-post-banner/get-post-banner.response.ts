import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPostBannerDTOResponse } from "./get-post-banner.dto";

export type GetPostBannerResponse = Either<
  AppError.UnexpectedError,
  Result<GetPostBannerDTOResponse>
>