import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPostBannerController } from "./get-post-banner.controller";
import { GetPostBannerUseCase } from "./get-post-banner.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostServiceFactory } from "~/modules/post/service/post-service.factory.interface";


export class GetPostBannerManager implements IUseCaseManager{

  private controller: GetPostBannerController;
  private useCase: GetPostBannerUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postServiceFactory: IPostServiceFactory
  ){

    this.useCase = new GetPostBannerUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
      this.postServiceFactory.getStorageService()
    );

    this.controller = new GetPostBannerController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPostBannerUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
      this.postServiceFactory.getStorageService()
    )
  }

  createController(){
    return new GetPostBannerController(this.useCase);
  }

}