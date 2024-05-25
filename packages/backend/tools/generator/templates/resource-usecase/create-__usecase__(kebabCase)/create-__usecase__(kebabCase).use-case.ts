import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { Create__usecase__PascalCase__DTORequest } from "./create-__usecase__(kebabCase).dto";
import { Create__usecase__PascalCase__Response } from "./create-__usecase__(kebabCase).response";


export class Create__usecase__PascalCase__UseCase implements UseCase<Create__usecase__PascalCase__DTORequest, Promise<Create__usecase__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: Create__usecase__PascalCase__DTORequest): Promise<Create__usecase__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}