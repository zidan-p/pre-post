import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetUserController } from "./get-user.controller";
import { GetUserUseCase } from "./get-user.use-case";


export class GetUserManager implements IUseCaseManager{

  private controller: GetUserController;
  private useCase: GetUserUseCase;

  constructor(){

    this.useCase = new GetUserUseCase()

    this.controller = new GetUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetUserUseCase()
  }

  createController(){
    return new GetUserController(this.useCase);
  }

}