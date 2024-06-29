import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetOnePostController } from "./get-one-post.controller";
import { GetOnePostUseCase } from "./get-one-post.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class GetOnePostManager implements IUseCaseManager{

  private controller: GetOnePostController;
  private useCase: GetOnePostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetOnePostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
    )

    this.controller = new GetOnePostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetOnePostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
    )
  }

  createController(){
    return new GetOnePostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}