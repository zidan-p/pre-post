import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPostsByCurrentUserDTORequest } from "./get-posts-by-current-user.dto";
import { GetPostsByCurrentUserResponse } from "./get-posts-by-current-user.response";


export class GetPostsByCurrentUserUseCase implements UseCase<GetPostsByCurrentUserDTORequest, Promise<GetPostsByCurrentUserResponse>>{

  constructor(
  ){}

  async execute(request: GetPostsByCurrentUserDTORequest): Promise<GetPostsByCurrentUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}