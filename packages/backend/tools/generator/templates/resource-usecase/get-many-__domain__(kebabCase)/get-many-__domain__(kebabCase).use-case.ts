import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetMany__domain__PascalCase__DTORequest } from "./get-many-__domain__(kebabCase).dto";
import { GetMany__domain__PascalCase__Response } from "./get-many-__domain__(kebabCase).response";


export class GetMany__domain__PascalCase__UseCase implements UseCase<GetMany__domain__PascalCase__DTORequest, Promise<GetMany__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: GetMany__domain__PascalCase__DTORequest): Promise<GetMany__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}