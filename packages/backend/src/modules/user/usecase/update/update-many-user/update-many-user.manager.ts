import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateManyUserController } from "./update-many-user.controller";
import { UpdateManyUserUseCase } from "./update-many-user.use-case";


export class UpdateManyUserManager implements IUseCaseManager{

  private controller: UpdateManyUserController;
  private useCase: UpdateManyUserUseCase;

  constructor(){

    this.useCase = new UpdateManyUserUseCase()

    this.controller = new UpdateManyUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateManyUserUseCase()
  }

  createController(){
    return new UpdateManyUserController(this.useCase);
  }

}