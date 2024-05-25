import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UnpublishManyOwnedPostsController } from "./unpublish-many-owned-posts.controller";
import { UnpublishManyOwnedPostsUseCase } from "./unpublish-many-owned-posts.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";


export class UnpublishManyOwnedPostsManager implements IUseCaseManager{

  private controller: UnpublishManyOwnedPostsController;
  private useCase: UnpublishManyOwnedPostsUseCase;

  constructor(
    private postRepoFactory: IPostRepositoryFactory
  ){

    this.useCase = new UnpublishManyOwnedPostsUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
    )

    this.controller = new UnpublishManyOwnedPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UnpublishManyOwnedPostsUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
    )
  }

  createController(){
    return new UnpublishManyOwnedPostsController(this.useCase);
  }

}