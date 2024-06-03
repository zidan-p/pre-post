import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { Update__domain__PascalCase__Controller } from "./update-__domain__(kebabCase).controller";
import { Update__domain__PascalCase__UseCase } from "./update-__domain__(kebabCase).use-case";


export class Update__domain__PascalCase__Manager implements IUseCaseManager{

  private controller: Update__domain__PascalCase__Controller;
  private useCase: Update__domain__PascalCase__UseCase;

  constructor(){

    this.useCase = new Update__domain__PascalCase__UseCase()

    this.controller = new Update__domain__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new Update__domain__PascalCase__UseCase()
  }

  createController(){
    return new Update__domain__PascalCase__Controller(this.useCase);
  }

}