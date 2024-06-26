import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateManyUserDTORequest } from "./update-many-user.dto";
import { UpdateManyUserResponse } from "./update-many-user.response";


export class UpdateManyUserUseCase implements UseCase<UpdateManyUserDTORequest, Promise<UpdateManyUserResponse>>{

  constructor(
  ){}

  async execute(request: UpdateManyUserDTORequest): Promise<UpdateManyUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}