import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPublishedPostByOwnerController } from "./get-published-post-by-owner.controller";
import { GetPublishedPostByOwnerUseCase } from "./get-published-post-by-owner.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class GetPublishedPostByOwnerManager<TPostPresenter extends Record<string, any> = Record<string, any>> implements IUseCaseManager{

  private controller: GetPublishedPostByOwnerController<TPostPresenter>;
  private useCase: GetPublishedPostByOwnerUseCase;

  constructor(
    protected readonly postRepoFactory: IPostRepositoryFactory,
    protected readonly postMapperFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetPublishedPostByOwnerUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo()  
    )

    this.controller = new GetPublishedPostByOwnerController(
      this.useCase,
      this.postMapperFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPublishedPostByOwnerUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo()  
    )
  }

  createController(){
    return new GetPublishedPostByOwnerController(
      this.useCase,
      this.postMapperFactory.createPostMapper()
    );
  }

}