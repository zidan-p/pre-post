import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetAllPublishedPostsController } from "./get-all-published-posts.controller";
import { GetAllPublishedPostsUseCase } from "./get-all-published-posts.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class GetAllPublishedPostsManager<TPostRaw extends Record<string, any>> implements IUseCaseManager{

  private controller: GetAllPublishedPostsController<TPostRaw>;
  private useCase: GetAllPublishedPostsUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetAllPublishedPostsUseCase(
      this.postRepoFactory.createPostRepo()
    )

    this.controller = new GetAllPublishedPostsController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper(),
      this.postMapperPresenterFactory.createPaginateMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetAllPublishedPostsUseCase(this.postRepoFactory.createPostRepo())
  }

  createController(){
    return new GetAllPublishedPostsController(      
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper(),
      this.postMapperPresenterFactory.createPaginateMapper()
      );
  }

}