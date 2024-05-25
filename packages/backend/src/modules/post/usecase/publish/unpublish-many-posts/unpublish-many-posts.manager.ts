import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UnpublishManyPostsController } from "./unpublish-many-posts.controller";
import { UnpublishManyPostsUseCase } from "./unpublish-many-posts.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";


export class UnpublishManyPostsManager implements IUseCaseManager{

  private controller: UnpublishManyPostsController;
  private useCase: UnpublishManyPostsUseCase;

  constructor(
    private postRepoFactory: IPostRepositoryFactory
  ){

    this.useCase = new UnpublishManyPostsUseCase(
      this.postRepoFactory.createPostRepo()
    )

    this.controller = new UnpublishManyPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UnpublishManyPostsUseCase(
      this.postRepoFactory.createPostRepo()
    )
  }

  createController(){
    return new UnpublishManyPostsController(this.useCase);
  }

}