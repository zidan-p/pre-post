import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteMany__domain__PascalCase__Controller } from "./delete-many-__domain__(kebabCase).controller";
import { DeleteMany__domain__PascalCase__UseCase } from "./delete-many-__domain__(kebabCase).use-case";


export class DeleteMany__domain__PascalCase__Manager implements IUseCaseManager{

  private controller: DeleteMany__domain__PascalCase__Controller;
  private useCase: DeleteMany__domain__PascalCase__UseCase;

  constructor(){

    this.useCase = new DeleteMany__domain__PascalCase__UseCase()

    this.controller = new DeleteMany__domain__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteMany__domain__PascalCase__UseCase()
  }

  createController(){
    return new DeleteMany__domain__PascalCase__Controller(this.useCase);
  }

}