import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { CreateMany__domain__PascalCase__Controller } from "./create-many-__domain__(kebabCase).controller";
import { CreateMany__domain__PascalCase__UseCase } from "./create-many-__domain__(kebabCase).use-case";


export class CreateMany__domain__PascalCase__Manager implements IUseCaseManager{

  private controller: CreateMany__domain__PascalCase__Controller;
  private useCase: CreateMany__domain__PascalCase__UseCase;

  constructor(){

    this.useCase = new CreateMany__domain__PascalCase__UseCase()

    this.controller = new CreateMany__domain__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new CreateMany__domain__PascalCase__UseCase()
  }

  createController(){
    return new CreateMany__domain__PascalCase__Controller(this.useCase);
  }

}