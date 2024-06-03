import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetMany__domain__PascalCase__Controller } from "./get-many-__domain__(kebabCase).controller";
import { GetMany__domain__PascalCase__UseCase } from "./get-many-__domain__(kebabCase).use-case";


export class GetMany__domain__PascalCase__Manager implements IUseCaseManager{

  private controller: GetMany__domain__PascalCase__Controller;
  private useCase: GetMany__domain__PascalCase__UseCase;

  constructor(){

    this.useCase = new GetMany__domain__PascalCase__UseCase()

    this.controller = new GetMany__domain__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetMany__domain__PascalCase__UseCase()
  }

  createController(){
    return new GetMany__domain__PascalCase__Controller(this.useCase);
  }

}