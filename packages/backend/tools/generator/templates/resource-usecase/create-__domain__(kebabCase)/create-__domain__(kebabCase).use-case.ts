import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { Create__domain__PascalCase__DTORequest } from "./create-__domain__(kebabCase).dto";
import { Create__domain__PascalCase__Response } from "./create-__domain__(kebabCase).response";


export class Create__domain__PascalCase__UseCase implements UseCase<Create__domain__PascalCase__DTORequest, Promise<Create__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: Create__domain__PascalCase__DTORequest): Promise<Create__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}