import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteOwnedPostController } from "./delete-owned-post.controller";
import { DeleteOwnedPostUseCase } from "./delete-owned-post.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostServiceFactory } from "~/modules/post/service/post-service.factory.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class DeleteOwnedPostManager implements IUseCaseManager{

  private controller: DeleteOwnedPostController;
  private useCase: DeleteOwnedPostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postServiceFactory: IPostServiceFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new DeleteOwnedPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postServiceFactory.getStorageService()
    )

    this.controller = new DeleteOwnedPostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteOwnedPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postServiceFactory.getStorageService()
    )
  }

  createController(){
    return new DeleteOwnedPostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}