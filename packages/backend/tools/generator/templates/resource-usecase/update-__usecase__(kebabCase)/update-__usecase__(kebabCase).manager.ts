import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { Update__usecase__PascalCase__Controller } from "./update-__usecase__(kebabCase).controller";
import { Update__usecase__PascalCase__UseCase } from "./update-__usecase__(kebabCase).use-case";


export class Update__usecase__PascalCase__Manager implements IUseCaseManager{

  private controller: Update__usecase__PascalCase__Controller;
  private useCase: Update__usecase__PascalCase__UseCase;

  constructor(){

    this.useCase = new Update__usecase__PascalCase__UseCase()

    this.controller = new Update__usecase__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new Update__usecase__PascalCase__UseCase()
  }

  createController(){
    return new Update__usecase__PascalCase__Controller(this.useCase);
  }

}