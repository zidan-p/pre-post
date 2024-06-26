import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetListUserController } from "./get-list-user.controller";
import { GetListUserUseCase } from "./get-list-user.use-case";


export class GetListUserManager implements IUseCaseManager{

  private controller: GetListUserController;
  private useCase: GetListUserUseCase;

  constructor(){

    this.useCase = new GetListUserUseCase()

    this.controller = new GetListUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetListUserUseCase()
  }

  createController(){
    return new GetListUserController(this.useCase);
  }

}