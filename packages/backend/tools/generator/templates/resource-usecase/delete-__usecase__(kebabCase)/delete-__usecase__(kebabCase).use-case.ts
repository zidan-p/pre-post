import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { Delete__usecase__PascalCase__DTORequest } from "./delete-__usecase__(kebabCase).dto";
import { Delete__usecase__PascalCase__Response } from "./delete-__usecase__(kebabCase).response";


export class Delete__usecase__PascalCase__UseCase implements UseCase<Delete__usecase__PascalCase__DTORequest, Promise<Delete__usecase__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: Delete__usecase__PascalCase__DTORequest): Promise<Delete__usecase__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}