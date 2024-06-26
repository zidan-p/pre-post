import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateUserDTORequest } from "./update-user.dto";
import { UpdateUserResponse } from "./update-user.response";


export class UpdateUserUseCase implements UseCase<UpdateUserDTORequest, Promise<UpdateUserResponse>>{

  constructor(
  ){}

  async execute(request: UpdateUserDTORequest): Promise<UpdateUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}