import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteMany__domain__PascalCase__DTORequest } from "./delete-many-__domain__(kebabCase).dto";
import { DeleteMany__domain__PascalCase__Response } from "./delete-many-__domain__(kebabCase).response";


export class DeleteMany__domain__PascalCase__UseCase implements UseCase<DeleteMany__domain__PascalCase__DTORequest, Promise<DeleteMany__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: DeleteMany__domain__PascalCase__DTORequest): Promise<DeleteMany__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}