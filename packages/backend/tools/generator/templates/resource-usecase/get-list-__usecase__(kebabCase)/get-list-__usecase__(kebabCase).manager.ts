import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetList__usecase__PascalCase__Controller } from "./get-list-__usecase__(kebabCase).controller";
import { GetList__usecase__PascalCase__UseCase } from "./get-list-__usecase__(kebabCase).use-case";


export class GetList__usecase__PascalCase__Manager implements IUseCaseManager{

  private controller: GetList__usecase__PascalCase__Controller;
  private useCase: GetList__usecase__PascalCase__UseCase;

  constructor(){

    this.useCase = new GetList__usecase__PascalCase__UseCase()

    this.controller = new GetList__usecase__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetList__usecase__PascalCase__UseCase()
  }

  createController(){
    return new GetList__usecase__PascalCase__Controller(this.useCase);
  }

}