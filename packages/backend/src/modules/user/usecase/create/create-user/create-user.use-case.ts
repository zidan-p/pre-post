import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { CreateUserDTORequest } from "./create-user.dto";
import { CreateUserResponse } from "./create-user.response";


export class CreateUserUseCase implements UseCase<CreateUserDTORequest, Promise<CreateUserResponse>>{

  constructor(
  ){}

  async execute(request: CreateUserDTORequest): Promise<CreateUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}