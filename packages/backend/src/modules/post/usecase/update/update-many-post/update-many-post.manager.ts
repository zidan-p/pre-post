import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateManyPostController } from "./update-many-post.controller";
import { UpdateManyPostUseCase } from "./update-many-post.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostServiceFactory } from "~/modules/post/service/post-service.factory.interface";


export class UpdateManyPostManager implements IUseCaseManager{

  private controller: UpdateManyPostController;
  private useCase: UpdateManyPostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private postServiceFactory: IPostServiceFactory
  ){

    this.useCase = new UpdateManyPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postServiceFactory.getStorageService()
    )

    this.controller = new UpdateManyPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateManyPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postServiceFactory.getStorageService()
    )
  }

  createController(){
    return new UpdateManyPostController(this.useCase);
  }

}