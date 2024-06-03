import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { CreateMany__domain__PascalCase__DTORequest } from "./create-many-__domain__(kebabCase).dto";
import { CreateMany__domain__PascalCase__Response } from "./create-many-__domain__(kebabCase).response";


export class CreateMany__domain__PascalCase__UseCase implements UseCase<CreateMany__domain__PascalCase__DTORequest, Promise<CreateMany__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: CreateMany__domain__PascalCase__DTORequest): Promise<CreateMany__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}