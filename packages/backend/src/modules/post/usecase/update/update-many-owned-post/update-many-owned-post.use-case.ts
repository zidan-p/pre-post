import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateManyOwnedPostDTORequest } from "./update-many-owned-post.dto";
import { UpdateManyOwnedPostResponse } from "./update-many-owned-post.response";


export class UpdateManyOwnedPostUseCase implements UseCase<UpdateManyOwnedPostDTORequest, Promise<UpdateManyOwnedPostResponse>>{

  constructor(
  ){}

  async execute(request: UpdateManyOwnedPostDTORequest): Promise<UpdateManyOwnedPostResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}