import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetNewestPublishedPostController } from "./get-newest-published-post.controller";
import { GetNewestPublishedPostUseCase } from "./get-newest-published-post.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class GetNewestPublishedPostManager<TPostRaw extends any> implements IUseCaseManager{

  private controller: GetNewestPublishedPostController<TPostRaw>;
  private useCase: GetNewestPublishedPostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetNewestPublishedPostUseCase(
      this.postRepoFactory.createPostRepo(),
    )

    this.controller = new GetNewestPublishedPostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetNewestPublishedPostUseCase(
      this.postRepoFactory.createPostRepo(),
    )
  }

  createController(){
    return new GetNewestPublishedPostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}