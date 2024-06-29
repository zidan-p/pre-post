import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetOnePostController } from "./get-one-post.controller";
import { GetOnePostUseCase } from "./get-one-post.use-case";


export class GetOnePostManager implements IUseCaseManager{

  private controller: GetOnePostController;
  private useCase: GetOnePostUseCase;

  constructor(){

    this.useCase = new GetOnePostUseCase()

    this.controller = new GetOnePostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetOnePostUseCase()
  }

  createController(){
    return new GetOnePostController(this.useCase);
  }

}