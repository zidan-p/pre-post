import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateUserController } from "./update-user.controller";
import { UpdateUserUseCase } from "./update-user.use-case";


export class UpdateUserManager implements IUseCaseManager{

  private controller: UpdateUserController;
  private useCase: UpdateUserUseCase;

  constructor(){

    this.useCase = new UpdateUserUseCase()

    this.controller = new UpdateUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateUserUseCase()
  }

  createController(){
    return new UpdateUserController(this.useCase);
  }

}