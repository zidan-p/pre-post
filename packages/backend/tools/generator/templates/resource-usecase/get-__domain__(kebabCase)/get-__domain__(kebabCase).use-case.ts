import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { Get__domain__PascalCase__DTORequest } from "./get-__domain__(kebabCase).dto";
import { Get__domain__PascalCase__Response } from "./get-__domain__(kebabCase).response";


export class Get__domain__PascalCase__UseCase implements UseCase<Get__domain__PascalCase__DTORequest, Promise<Get__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: Get__domain__PascalCase__DTORequest): Promise<Get__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}