import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UnpublishManyPostsController } from "./unpublish-many-posts.controller";
import { UnpublishManyPostsUseCase } from "./unpublish-many-posts.use-case";


export class UnpublishManyPostsManager implements IUseCaseManager{

  private controller: UnpublishManyPostsController;
  private useCase: UnpublishManyPostsUseCase;

  constructor(){

    this.useCase = new UnpublishManyPostsUseCase()

    this.controller = new UnpublishManyPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UnpublishManyPostsUseCase()
  }

  createController(){
    return new UnpublishManyPostsController(this.useCase);
  }

}