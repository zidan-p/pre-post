import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { Delete__domain__PascalCase__Controller } from "./delete-__domain__(kebabCase).controller";
import { Delete__domain__PascalCase__UseCase } from "./delete-__domain__(kebabCase).use-case";


export class Delete__domain__PascalCase__Manager implements IUseCaseManager{

  private controller: Delete__domain__PascalCase__Controller;
  private useCase: Delete__domain__PascalCase__UseCase;

  constructor(){

    this.useCase = new Delete__domain__PascalCase__UseCase()

    this.controller = new Delete__domain__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new Delete__domain__PascalCase__UseCase()
  }

  createController(){
    return new Delete__domain__PascalCase__Controller(this.useCase);
  }

}