import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteManyOwnedPostDTORequest } from "./delete-many-owned-post.dto";
import { DeleteManyOwnedPostResponse } from "./delete-many-owned-post.response";


export class DeleteManyOwnedPostUseCase implements UseCase<DeleteManyOwnedPostDTORequest, Promise<DeleteManyOwnedPostResponse>>{

  constructor(
  ){}

  async execute(request: DeleteManyOwnedPostDTORequest): Promise<DeleteManyOwnedPostResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}