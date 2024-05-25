import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { Update__usecase__PascalCase__DTORequest } from "./update-__usecase__(kebabCase).dto";
import { Update__usecase__PascalCase__Response } from "./update-__usecase__(kebabCase).response";


export class Update__usecase__PascalCase__UseCase implements UseCase<Update__usecase__PascalCase__DTORequest, Promise<Update__usecase__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: Update__usecase__PascalCase__DTORequest): Promise<Update__usecase__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}