import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetUserDTORequest } from "./get-user.dto";
import { GetUserResponse } from "./get-user.response";


export class GetUserUseCase implements UseCase<GetUserDTORequest, Promise<GetUserResponse>>{

  constructor(
  ){}

  async execute(request: GetUserDTORequest): Promise<GetUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}