import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { Get__usecase__PascalCase__DTORequest } from "./get-__usecase__(kebabCase).dto";
import { Get__usecase__PascalCase__Response } from "./get-__usecase__(kebabCase).response";


export class Get__usecase__PascalCase__UseCase implements UseCase<Get__usecase__PascalCase__DTORequest, Promise<Get__usecase__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: Get__usecase__PascalCase__DTORequest): Promise<Get__usecase__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}