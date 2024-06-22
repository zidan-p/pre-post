import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateOwnedPostDTORequest } from "./update-owned-post.dto";
import { UpdateOwnedPostResponse } from "./update-owned-post.response";


export class UpdateOwnedPostUseCase implements UseCase<UpdateOwnedPostDTORequest, Promise<UpdateOwnedPostResponse>>{

  constructor(
  ){}

  async execute(request: UpdateOwnedPostDTORequest): Promise<UpdateOwnedPostResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}