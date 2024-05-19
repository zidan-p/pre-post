import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPostsByUserDTORequest } from "./get-posts-by-user.dto";
import { GetPostsByUserResponse } from "./get-posts-by-user.response";


export class GetPostsByUserUseCase implements UseCase<GetPostsByUserDTORequest, Promise<GetPostsByUserResponse>>{

  constructor(
  ){}

  async execute(request: GetPostsByUserDTORequest): Promise<GetPostsByUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}