import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetMany__usecase__PascalCase__DTORequest } from "./get-many-__usecase__(kebabCase).dto";
import { GetMany__usecase__PascalCase__Response } from "./get-many-__usecase__(kebabCase).response";


export class GetMany__usecase__PascalCase__UseCase implements UseCase<GetMany__usecase__PascalCase__DTORequest, Promise<GetMany__usecase__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: GetMany__usecase__PascalCase__DTORequest): Promise<GetMany__usecase__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}