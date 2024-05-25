import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteMany__usecase__PascalCase__Controller } from "./delete-many-__usecase__(kebabCase).controller";
import { DeleteMany__usecase__PascalCase__UseCase } from "./delete-many-__usecase__(kebabCase).use-case";


export class DeleteMany__usecase__PascalCase__Manager implements IUseCaseManager{

  private controller: DeleteMany__usecase__PascalCase__Controller;
  private useCase: DeleteMany__usecase__PascalCase__UseCase;

  constructor(){

    this.useCase = new DeleteMany__usecase__PascalCase__UseCase()

    this.controller = new DeleteMany__usecase__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteMany__usecase__PascalCase__UseCase()
  }

  createController(){
    return new DeleteMany__usecase__PascalCase__Controller(this.useCase);
  }

}