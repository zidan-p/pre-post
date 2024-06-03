import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { Update__domain__PascalCase__DTORequest } from "./update-__domain__(kebabCase).dto";
import { Update__domain__PascalCase__Response } from "./update-__domain__(kebabCase).response";


export class Update__domain__PascalCase__UseCase implements UseCase<Update__domain__PascalCase__DTORequest, Promise<Update__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: Update__domain__PascalCase__DTORequest): Promise<Update__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}