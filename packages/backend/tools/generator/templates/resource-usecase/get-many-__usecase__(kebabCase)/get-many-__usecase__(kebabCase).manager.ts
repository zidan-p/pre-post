import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetMany__usecase__PascalCase__Controller } from "./get-many-__usecase__(kebabCase).controller";
import { GetMany__usecase__PascalCase__UseCase } from "./get-many-__usecase__(kebabCase).use-case";


export class GetMany__usecase__PascalCase__Manager implements IUseCaseManager{

  private controller: GetMany__usecase__PascalCase__Controller;
  private useCase: GetMany__usecase__PascalCase__UseCase;

  constructor(){

    this.useCase = new GetMany__usecase__PascalCase__UseCase()

    this.controller = new GetMany__usecase__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetMany__usecase__PascalCase__UseCase()
  }

  createController(){
    return new GetMany__usecase__PascalCase__Controller(this.useCase);
  }

}