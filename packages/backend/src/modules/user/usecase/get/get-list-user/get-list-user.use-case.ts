import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetListUserDTORequest } from "./get-list-user.dto";
import { GetListUserResponse } from "./get-list-user.response";


export class GetListUserUseCase implements UseCase<GetListUserDTORequest, Promise<GetListUserResponse>>{

  constructor(
  ){}

  async execute(request: GetListUserDTORequest): Promise<GetListUserResponse> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}