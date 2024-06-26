import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteManyUserDTORequest } from "./delete-many-user.dto";
import { DeleteManyUserResponse } from "./delete-many-user.response";


export class DeleteManyUserUseCase implements UseCase<DeleteManyUserDTORequest, Promise<DeleteManyUserResponse>>{

  constructor(
  ){}

  async execute(request: DeleteManyUserDTORequest): Promise<DeleteManyUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}