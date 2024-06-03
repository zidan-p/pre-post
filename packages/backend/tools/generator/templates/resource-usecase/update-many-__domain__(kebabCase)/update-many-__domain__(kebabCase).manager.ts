import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateMany__domain__PascalCase__Controller } from "./update-many-__domain__(kebabCase).controller";
import { UpdateMany__domain__PascalCase__UseCase } from "./update-many-__domain__(kebabCase).use-case";


export class UpdateMany__domain__PascalCase__Manager implements IUseCaseManager{

  private controller: UpdateMany__domain__PascalCase__Controller;
  private useCase: UpdateMany__domain__PascalCase__UseCase;

  constructor(){

    this.useCase = new UpdateMany__domain__PascalCase__UseCase()

    this.controller = new UpdateMany__domain__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateMany__domain__PascalCase__UseCase()
  }

  createController(){
    return new UpdateMany__domain__PascalCase__Controller(this.useCase);
  }

}