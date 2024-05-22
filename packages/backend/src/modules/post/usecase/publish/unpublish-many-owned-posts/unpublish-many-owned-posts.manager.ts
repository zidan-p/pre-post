import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UnpublishManyOwnedPostsController } from "./unpublish-many-owned-posts.controller";
import { UnpublishManyOwnedPostsUseCase } from "./unpublish-many-owned-posts.use-case";


export class UnpublishManyOwnedPostsManager implements IUseCaseManager{

  private controller: UnpublishManyOwnedPostsController;
  private useCase: UnpublishManyOwnedPostsUseCase;

  constructor(){

    this.useCase = new UnpublishManyOwnedPostsUseCase()

    this.controller = new UnpublishManyOwnedPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UnpublishManyOwnedPostsUseCase()
  }

  createController(){
    return new UnpublishManyOwnedPostsController(this.useCase);
  }

}