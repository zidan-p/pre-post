import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPostBannerDTORequest } from "./get-post-banner.dto";
import { GetPostBannerResponse } from "./get-post-banner.response";


export class GetPostBannerUseCase implements UseCase<GetPostBannerDTORequest, Promise<GetPostBannerResponse>>{

  constructor(
  ){}

  async execute(request: GetPostBannerDTORequest): Promise<GetPostBannerResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}