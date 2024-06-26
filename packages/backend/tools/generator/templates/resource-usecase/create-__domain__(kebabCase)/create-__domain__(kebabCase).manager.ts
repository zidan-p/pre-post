import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { Create__domain__PascalCase__Controller } from "./create-__domain__(kebabCase).controller";
import { Create__domain__PascalCase__UseCase } from "./create-__domain__(kebabCase).use-case";


export class Create__domain__PascalCase__Manager implements IUseCaseManager{

  private controller: Create__domain__PascalCase__Controller;
  private useCase: Create__domain__PascalCase__UseCase;

  constructor(){

    this.useCase = new Create__domain__PascalCase__UseCase()

    this.controller = new Create__domain__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new Create__domain__PascalCase__UseCase()
  }

  createController(){
    return new Create__domain__PascalCase__Controller(this.useCase);
  }

}