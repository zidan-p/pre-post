import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { PublishManyPostsDTORequest } from "./publish-many-posts.dto";
import { PublishManyPostsResponse } from "./publish-many-posts.response";


export class PublishManyPostsUseCase implements UseCase<PublishManyPostsDTORequest, Promise<PublishManyPostsResponse>>{

  constructor(
  ){}

  async execute(request: PublishManyPostsDTORequest): Promise<PublishManyPostsResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}