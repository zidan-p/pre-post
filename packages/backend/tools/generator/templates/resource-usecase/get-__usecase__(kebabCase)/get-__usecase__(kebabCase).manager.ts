import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { Get__usecase__PascalCase__Controller } from "./get-__usecase__(kebabCase).controller";
import { Get__usecase__PascalCase__UseCase } from "./get-__usecase__(kebabCase).use-case";


export class Get__usecase__PascalCase__Manager implements IUseCaseManager{

  private controller: Get__usecase__PascalCase__Controller;
  private useCase: Get__usecase__PascalCase__UseCase;

  constructor(){

    this.useCase = new Get__usecase__PascalCase__UseCase()

    this.controller = new Get__usecase__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new Get__usecase__PascalCase__UseCase()
  }

  createController(){
    return new Get__usecase__PascalCase__Controller(this.useCase);
  }

}