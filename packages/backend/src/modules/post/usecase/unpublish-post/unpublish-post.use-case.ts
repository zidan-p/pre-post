import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UnpublishPostDTORequest } from "./unpublish-post.dto";
import { UnpublishPostResponse } from "./unpublish-post.response";


export class UnpublishPostUseCase implements UseCase<UnpublishPostDTORequest, Promise<UnpublishPostResponse>>{

  constructor(
  ){}

  async execute(request: UnpublishPostDTORequest): Promise<UnpublishPostResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}