import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteManyUserController } from "./delete-many-user.controller";
import { DeleteManyUserUseCase } from "./delete-many-user.use-case";


export class DeleteManyUserManager implements IUseCaseManager{

  private controller: DeleteManyUserController;
  private useCase: DeleteManyUserUseCase;

  constructor(){

    this.useCase = new DeleteManyUserUseCase()

    this.controller = new DeleteManyUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteManyUserUseCase()
  }

  createController(){
    return new DeleteManyUserController(this.useCase);
  }

}