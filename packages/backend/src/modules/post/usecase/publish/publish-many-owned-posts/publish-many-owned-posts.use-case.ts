import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { PublishManyOwnedPostsDTORequest } from "./publish-many-owned-posts.dto";
import { PublishManyOwnedPostsResponse } from "./publish-many-owned-posts.response";


export class PublishManyOwnedPostsUseCase implements UseCase<PublishManyOwnedPostsDTORequest, Promise<PublishManyOwnedPostsResponse>>{

  constructor(
  ){}

  async execute(request: PublishManyOwnedPostsDTORequest): Promise<PublishManyOwnedPostsResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}