import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPublishedPostsDTORequest } from "./get-published-posts.dto";
import { GetPublishedPostsResponse } from "./get-published-posts.response";


export class GetPublishedPostsUseCase implements UseCase<GetPublishedPostsDTORequest, Promise<GetPublishedPostsResponse>>{

  constructor(
  ){}

  async execute(request: GetPublishedPostsDTORequest): Promise<GetPublishedPostsResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}