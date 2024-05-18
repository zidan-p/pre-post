import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { __usecase__PascalCase__DTORequest } from "./__usecase__(kebabCase).dto";
import { __usecase__PascalCase__Response } from "./__usecase__(kebabCase).response";


export class __usecase__PascalCase__UseCase implements UseCase<__usecase__PascalCase__DTORequest, Promise<__usecase__PascalCase__Response>>{

  constructor(
  ){}

  async execute(request: __usecase__PascalCase__DTORequest): Promise<__usecase__PascalCase__Response> {
    try{
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}