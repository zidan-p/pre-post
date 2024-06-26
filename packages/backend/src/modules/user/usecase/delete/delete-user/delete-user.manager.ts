import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteUserController } from "./delete-user.controller";
import { DeleteUserUseCase } from "./delete-user.use-case";


export class DeleteUserManager implements IUseCaseManager{

  private controller: DeleteUserController;
  private useCase: DeleteUserUseCase;

  constructor(){

    this.useCase = new DeleteUserUseCase()

    this.controller = new DeleteUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteUserUseCase()
  }

  createController(){
    return new DeleteUserController(this.useCase);
  }

}