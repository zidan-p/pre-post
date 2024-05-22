import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPublishedPostsController } from "./get-published-posts.controller";
import { GetPublishedPostsUseCase } from "./get-published-posts.use-case";


export class GetPublishedPostsManager implements IUseCaseManager{

  private controller: GetPublishedPostsController;
  private useCase: GetPublishedPostsUseCase;

  constructor(){

    this.useCase = new GetPublishedPostsUseCase()

    this.controller = new GetPublishedPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPublishedPostsUseCase()
  }

  createController(){
    return new GetPublishedPostsController(this.useCase);
  }

}