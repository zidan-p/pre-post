import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetManyUserController } from "./get-many-user.controller";
import { GetManyUserUseCase } from "./get-many-user.use-case";


export class GetManyUserManager implements IUseCaseManager{

  private controller: GetManyUserController;
  private useCase: GetManyUserUseCase;

  constructor(){

    this.useCase = new GetManyUserUseCase()

    this.controller = new GetManyUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetManyUserUseCase()
  }

  createController(){
    return new GetManyUserController(this.useCase);
  }

}