import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { GetPostBannerDTOResponse } from "./get-post-banner.dto";
import { GetPostBannerUseCaseErrors } from "./get-post-banner.error";

export type GetPostBannerResponse = Either<
  GetPostBannerUseCaseErrors.ForbiddenAccess | 
  GetPostBannerUseCaseErrors.InvalidId | 
  GetPostBannerUseCaseErrors.PostNotFound | 
  GetPostBannerUseCaseErrors.UserNotFound | 
  GetPostBannerUseCaseErrors.BannerNotFound | 
  AppError.UnexpectedError,
  Result<GetPostBannerDTOResponse>
>