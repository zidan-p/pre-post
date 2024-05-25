import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { Delete__usecase__PascalCase__Controller } from "./delete-__usecase__(kebabCase).controller";
import { Delete__usecase__PascalCase__UseCase } from "./delete-__usecase__(kebabCase).use-case";


export class Delete__usecase__PascalCase__Manager implements IUseCaseManager{

  private controller: Delete__usecase__PascalCase__Controller;
  private useCase: Delete__usecase__PascalCase__UseCase;

  constructor(){

    this.useCase = new Delete__usecase__PascalCase__UseCase()

    this.controller = new Delete__usecase__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new Delete__usecase__PascalCase__UseCase()
  }

  createController(){
    return new Delete__usecase__PascalCase__Controller(this.useCase);
  }

}