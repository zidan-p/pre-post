import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { PublishManyPostsController } from "./publish-many-posts.controller";
import { PublishManyPostsUseCase } from "./publish-many-posts.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";


export class PublishManyPostsManager implements IUseCaseManager{

  private controller: PublishManyPostsController;
  private useCase: PublishManyPostsUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory
  ){

    this.useCase = new PublishManyPostsUseCase(this.postRepoFactory.createPostRepo())

    this.controller = new PublishManyPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new PublishManyPostsUseCase(this.postRepoFactory.createPostRepo())
  }

  createController(){
    return new PublishManyPostsController(this.useCase);
  }

}