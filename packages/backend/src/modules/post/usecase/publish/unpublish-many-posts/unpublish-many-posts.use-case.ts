import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UnpublishManyPostsDTORequest } from "./unpublish-many-posts.dto";
import { UnpublishManyPostsResponse } from "./unpublish-many-posts.response";


export class UnpublishManyPostsUseCase implements UseCase<UnpublishManyPostsDTORequest, Promise<UnpublishManyPostsResponse>>{

  constructor(
  ){}

  async execute(request: UnpublishManyPostsDTORequest): Promise<UnpublishManyPostsResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}