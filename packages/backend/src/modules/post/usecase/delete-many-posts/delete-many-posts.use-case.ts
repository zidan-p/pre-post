import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteManyPostsDTORequest } from "./delete-many-posts.dto";
import { DeleteManyPostsResponse } from "./delete-many-posts.response";


export class DeleteManyPostsUseCase implements UseCase<DeleteManyPostsDTORequest, Promise<DeleteManyPostsResponse>>{

  constructor(
  ){}

  async execute(request: DeleteManyPostsDTORequest): Promise<DeleteManyPostsResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}