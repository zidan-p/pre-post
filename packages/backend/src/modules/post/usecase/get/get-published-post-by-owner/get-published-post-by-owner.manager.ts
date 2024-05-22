import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPublishedPostByOwnerController } from "./get-published-post-by-owner.controller";
import { GetPublishedPostByOwnerUseCase } from "./get-published-post-by-owner.use-case";


export class GetPublishedPostByOwnerManager implements IUseCaseManager{

  private controller: GetPublishedPostByOwnerController;
  private useCase: GetPublishedPostByOwnerUseCase;

  constructor(){

    this.useCase = new GetPublishedPostByOwnerUseCase()

    this.controller = new GetPublishedPostByOwnerController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPublishedPostByOwnerUseCase()
  }

  createController(){
    return new GetPublishedPostByOwnerController(this.useCase);
  }

}