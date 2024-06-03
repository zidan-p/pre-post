import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { Delete__domain__PascalCase__DTORequest } from "./delete-__domain__(kebabCase).dto";
import { Delete__domain__PascalCase__Response } from "./delete-__domain__(kebabCase).response";


export class Delete__domain__PascalCase__UseCase implements UseCase<Delete__domain__PascalCase__DTORequest, Promise<Delete__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: Delete__domain__PascalCase__DTORequest): Promise<Delete__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}