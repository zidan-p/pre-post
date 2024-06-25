import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateManyOwnedPostController } from "./update-many-owned-post.controller";
import { UpdateManyOwnedPostUseCase } from "./update-many-owned-post.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostServiceFactory } from "~/modules/post/service/post-service.factory.interface";


export class UpdateManyOwnedPostManager implements IUseCaseManager{

  private controller: UpdateManyOwnedPostController;
  private useCase: UpdateManyOwnedPostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postServiceFactory: IPostServiceFactory
  ){

    this.useCase = new UpdateManyOwnedPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postRepoFactory.createUserRepo(),
      this.postServiceFactory.getStorageService()
    )

    this.controller = new UpdateManyOwnedPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateManyOwnedPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postRepoFactory.createUserRepo(),
      this.postServiceFactory.getStorageService()
    )
  }

  createController(){
    return new UpdateManyOwnedPostController(this.useCase);
  }

}