import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { CreateManyUserController } from "./create-many-user.controller";
import { CreateManyUserUseCase } from "./create-many-user.use-case";


export class CreateManyUserManager implements IUseCaseManager{

  private controller: CreateManyUserController;
  private useCase: CreateManyUserUseCase;

  constructor(){

    this.useCase = new CreateManyUserUseCase()

    this.controller = new CreateManyUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new CreateManyUserUseCase()
  }

  createController(){
    return new CreateManyUserController(this.useCase);
  }

}