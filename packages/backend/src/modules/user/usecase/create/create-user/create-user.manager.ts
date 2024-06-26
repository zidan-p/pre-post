import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { CreateUserController } from "./create-user.controller";
import { CreateUserUseCase } from "./create-user.use-case";


export class CreateUserManager implements IUseCaseManager{

  private controller: CreateUserController;
  private useCase: CreateUserUseCase;

  constructor(){

    this.useCase = new CreateUserUseCase()

    this.controller = new CreateUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new CreateUserUseCase()
  }

  createController(){
    return new CreateUserController(this.useCase);
  }

}