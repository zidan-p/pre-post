import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { __usecase__PascalCase__Controller } from "./__usecase__(kebabCase).controller";
import { __usecase__PascalCase__UseCase } from "./__usecase__(kebabCase).use-case";


export class __usecase__PascalCase__Manager implements IUseCaseManager{

  private controller: __usecase__PascalCase__Controller;
  private useCase: __usecase__PascalCase__UseCase;

  constructor(){

    this.useCase = new __usecase__PascalCase__UseCase()

    this.controller = new __usecase__PascalCase__Controller(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new __usecase__PascalCase__UseCase()
  }

  createController(){
    return new __usecase__PascalCase__Controller(this.useCase);
  }

}