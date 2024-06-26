import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { CreateManyUserDTORequest } from "./create-many-user.dto";
import { CreateManyUserResponse } from "./create-many-user.response";


export class CreateManyUserUseCase implements UseCase<CreateManyUserDTORequest, Promise<CreateManyUserResponse>>{

  constructor(
  ){}

  async execute(request: CreateManyUserDTORequest): Promise<CreateManyUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}