import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteUserDTORequest } from "./delete-user.dto";
import { DeleteUserResponse } from "./delete-user.response";


export class DeleteUserUseCase implements UseCase<DeleteUserDTORequest, Promise<DeleteUserResponse>>{

  constructor(
  ){}

  async execute(request: DeleteUserDTORequest): Promise<DeleteUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}