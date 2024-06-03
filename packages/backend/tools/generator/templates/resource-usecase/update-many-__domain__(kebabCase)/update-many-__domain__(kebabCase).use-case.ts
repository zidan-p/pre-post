import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateMany__domain__PascalCase__DTORequest } from "./update-many-__domain__(kebabCase).dto";
import { UpdateMany__domain__PascalCase__Response } from "./update-many-__domain__(kebabCase).response";


export class UpdateMany__domain__PascalCase__UseCase implements UseCase<UpdateMany__domain__PascalCase__DTORequest, Promise<UpdateMany__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: UpdateMany__domain__PascalCase__DTORequest): Promise<UpdateMany__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}