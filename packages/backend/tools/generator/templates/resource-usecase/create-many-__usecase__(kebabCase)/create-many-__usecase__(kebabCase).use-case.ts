import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { CreateMany__usecase__PascalCase__DTORequest } from "./create-many-__usecase__(kebabCase).dto";
import { CreateMany__usecase__PascalCase__Response } from "./create-many-__usecase__(kebabCase).response";


export class CreateMany__usecase__PascalCase__UseCase implements UseCase<CreateMany__usecase__PascalCase__DTORequest, Promise<CreateMany__usecase__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: CreateMany__usecase__PascalCase__DTORequest): Promise<CreateMany__usecase__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}