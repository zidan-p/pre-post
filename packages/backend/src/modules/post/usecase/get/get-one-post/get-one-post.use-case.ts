import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetOnePostDTORequest } from "./get-one-post.dto";
import { GetOnePostResponse } from "./get-one-post.response";


export class GetOnePostUseCase implements UseCase<GetOnePostDTORequest, Promise<GetOnePostResponse>>{

  constructor(
  ){}

  async execute(request: GetOnePostDTORequest): Promise<GetOnePostResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}