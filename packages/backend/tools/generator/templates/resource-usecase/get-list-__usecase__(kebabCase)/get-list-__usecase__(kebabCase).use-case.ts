import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetList__usecase__PascalCase__DTORequest } from "./get-list-__usecase__(kebabCase).dto";
import { GetList__usecase__PascalCase__Response } from "./get-list-__usecase__(kebabCase).response";


export class GetList__usecase__PascalCase__UseCase implements UseCase<GetList__usecase__PascalCase__DTORequest, Promise<GetList__usecase__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: GetList__usecase__PascalCase__DTORequest): Promise<GetList__usecase__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}