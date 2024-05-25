import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { CreateMany__usecase__PascalCase__Controller } from "./create-many-__usecase__(kebabCase).controller";
import { CreateMany__usecase__PascalCase__UseCase } from "./create-many-__usecase__(kebabCase).use-case";


export class CreateMany__usecase__PascalCase__Manager implements IUseCaseManager{

  private controller: CreateMany__usecase__PascalCase__Controller;
  private useCase: CreateMany__usecase__PascalCase__UseCase;

  constructor(){

    this.useCase = new CreateMany__usecase__PascalCase__UseCase()

    this.controller = new CreateMany__usecase__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new CreateMany__usecase__PascalCase__UseCase()
  }

  createController(){
    return new CreateMany__usecase__PascalCase__Controller(this.useCase);
  }

}