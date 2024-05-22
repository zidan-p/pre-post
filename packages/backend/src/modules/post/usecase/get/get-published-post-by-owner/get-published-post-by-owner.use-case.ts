import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPublishedPostByOwnerDTORequest } from "./get-published-post-by-owner.dto";
import { GetPublishedPostByOwnerResponse } from "./get-published-post-by-owner.response";


export class GetPublishedPostByOwnerUseCase implements UseCase<GetPublishedPostByOwnerDTORequest, Promise<GetPublishedPostByOwnerResponse>>{

  constructor(
  ){}

  async execute(request: GetPublishedPostByOwnerDTORequest): Promise<GetPublishedPostByOwnerResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}