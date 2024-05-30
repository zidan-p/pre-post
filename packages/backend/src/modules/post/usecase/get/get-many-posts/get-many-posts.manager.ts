import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetManyPostsController } from "./get-many-posts.controller";
import { GetManyPostsUseCase } from "./get-many-posts.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class GetManyPostsManager<TPostRaw = any> implements IUseCaseManager{

  private controller: GetManyPostsController;
  private useCase: GetManyPostsUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetManyPostsUseCase(
      this.postRepoFactory.createPostRepo()
    )

    this.controller = new GetManyPostsController<TPostRaw>(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetManyPostsUseCase(
      this.postRepoFactory.createPostRepo()
    )
  }

  createController(){
    return new GetManyPostsController<TPostRaw>(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}