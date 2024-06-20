import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteManyPostsController } from "./delete-many-posts.controller";
import { DeleteManyPostsUseCase } from "./delete-many-posts.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostServiceFactory } from "~/modules/post/service/post-service.factory.interface";


export class DeleteManyPostsManager implements IUseCaseManager{

  private controller: DeleteManyPostsController;
  private useCase: DeleteManyPostsUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postServiceFactory: IPostServiceFactory
  ){

    this.useCase = new DeleteManyPostsUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postServiceFactory.getStorageService()
    )

    this.controller = new DeleteManyPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteManyPostsUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postServiceFactory.getStorageService()
    )
  }

  createController(){
    return new DeleteManyPostsController(this.useCase);
  }

}