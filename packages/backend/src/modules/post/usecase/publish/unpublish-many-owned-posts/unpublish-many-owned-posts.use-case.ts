import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UnpublishManyOwnedPostsDTORequest } from "./unpublish-many-owned-posts.dto";
import { UnpublishManyOwnedPostsResponse } from "./unpublish-many-owned-posts.response";


export class UnpublishManyOwnedPostsUseCase implements UseCase<UnpublishManyOwnedPostsDTORequest, Promise<UnpublishManyOwnedPostsResponse>>{

  constructor(
  ){}

  async execute(request: UnpublishManyOwnedPostsDTORequest): Promise<UnpublishManyOwnedPostsResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}