import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetAllPostListController } from "./get-all-post-list.controller";
import { GetAllPostListUseCase } from "./get-all-post-list.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class GetAllPostListManager implements IUseCaseManager{

  private controller: GetAllPostListController;
  private useCase: GetAllPostListUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postMapperFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetAllPostListUseCase(
      this.postRepoFactory.createPostRepo()
    )

    this.controller = new GetAllPostListController(
      this.useCase,
      this.postMapperFactory.createPostMapper(),
      this.postMapperFactory.createPaginateMapper(),
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetAllPostListUseCase(
      this.postRepoFactory.createPostRepo()
    )
  }

  createController(){
    return new GetAllPostListController(
      this.useCase,
      this.postMapperFactory.createPostMapper(),
      this.postMapperFactory.createPaginateMapper(),
    );
  }

}