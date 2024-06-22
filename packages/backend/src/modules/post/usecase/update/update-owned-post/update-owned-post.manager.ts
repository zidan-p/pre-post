import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateOwnedPostController } from "./update-owned-post.controller";
import { UpdateOwnedPostUseCase } from "./update-owned-post.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostServiceFactory } from "~/modules/post/service/post-service.factory.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class UpdateOwnedPostManager implements IUseCaseManager{

  private controller: UpdateOwnedPostController;
  private useCase: UpdateOwnedPostUseCase;

  constructor(
    private readonly postRepoFact: IPostRepositoryFactory,
    private readonly postServiceFact: IPostServiceFactory,
    private readonly postMapperFacto: IPostMapperPresenterFactory
  ){

    this.useCase = new UpdateOwnedPostUseCase(
      this.postRepoFact.createPostImageRepo(),
      this.postRepoFact.createPostRepo(),
      this.postRepoFact.createUserRepo(),
      this.postServiceFact.getStorageService()
    )

    this.controller = new UpdateOwnedPostController(
      this.useCase, this.postMapperFacto.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateOwnedPostUseCase(
      this.postRepoFact.createPostImageRepo(),
      this.postRepoFact.createPostRepo(),
      this.postRepoFact.createUserRepo(),
      this.postServiceFact.getStorageService()
    )
  }

  createController(){
    return new UpdateOwnedPostController(
      this.useCase, this.postMapperFacto.createPostMapper()
    );
  }

}