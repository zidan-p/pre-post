import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetManyUserDTORequest } from "./get-many-user.dto";
import { GetManyUserResponse } from "./get-many-user.response";


export class GetManyUserUseCase implements UseCase<GetManyUserDTORequest, Promise<GetManyUserResponse>>{

  constructor(
  ){}

  async execute(request: GetManyUserDTORequest): Promise<GetManyUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}