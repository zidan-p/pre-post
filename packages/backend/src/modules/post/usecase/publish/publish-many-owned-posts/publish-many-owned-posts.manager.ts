import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { PublishManyOwnedPostsController } from "./publish-many-owned-posts.controller";
import { PublishManyOwnedPostsUseCase } from "./publish-many-owned-posts.use-case";


export class PublishManyOwnedPostsManager implements IUseCaseManager{

  private controller: PublishManyOwnedPostsController;
  private useCase: PublishManyOwnedPostsUseCase;

  constructor(){

    this.useCase = new PublishManyOwnedPostsUseCase()

    this.controller = new PublishManyOwnedPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new PublishManyOwnedPostsUseCase()
  }

  createController(){
    return new PublishManyOwnedPostsController(this.useCase);
  }

}