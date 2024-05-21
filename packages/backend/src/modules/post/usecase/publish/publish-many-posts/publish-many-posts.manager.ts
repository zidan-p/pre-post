import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { PublishManyPostsController } from "./publish-many-posts.controller";
import { PublishManyPostsUseCase } from "./publish-many-posts.use-case";


export class PublishManyPostsManager implements IUseCaseManager{

  private controller: PublishManyPostsController;
  private useCase: PublishManyPostsUseCase;

  constructor(){

    this.useCase = new PublishManyPostsUseCase()

    this.controller = new PublishManyPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new PublishManyPostsUseCase()
  }

  createController(){
    return new PublishManyPostsController(this.useCase);
  }

}