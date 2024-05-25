import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { PublishManyOwnedPostsController } from "./publish-many-owned-posts.controller";
import { PublishManyOwnedPostsUseCase } from "./publish-many-owned-posts.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";


export class PublishManyOwnedPostsManager implements IUseCaseManager{

  private controller: PublishManyOwnedPostsController;
  private useCase: PublishManyOwnedPostsUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
  ){

    this.useCase = new PublishManyOwnedPostsUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
    )

    this.controller = new PublishManyOwnedPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new PublishManyOwnedPostsUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
    )
  }

  createController(){
    return new PublishManyOwnedPostsController(this.useCase);
  }

}