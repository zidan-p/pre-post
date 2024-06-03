import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetList__domain__PascalCase__DTORequest } from "./get-list-__domain__(kebabCase).dto";
import { GetList__domain__PascalCase__Response } from "./get-list-__domain__(kebabCase).response";


export class GetList__domain__PascalCase__UseCase implements UseCase<GetList__domain__PascalCase__DTORequest, Promise<GetList__domain__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: GetList__domain__PascalCase__DTORequest): Promise<GetList__domain__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}