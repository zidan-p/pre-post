import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetNewestPostController } from "./get-newest-post.controller";
import { GetNewestPostUseCase } from "./get-newest-post.use-case";
import { IPostRepositoryFactory } from "../../../repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "../../../mappers/post-mapper.factory.interface";


export class GetNewestPostManager implements IUseCaseManager{

  private controller: GetNewestPostController;
  private useCase: GetNewestPostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory, 
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetNewestPostUseCase(
      this.postRepoFactory.createPostRepo()
    )

    this.controller = new GetNewestPostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetNewestPostUseCase(
      this.postRepoFactory.createPostRepo()
    )
  }

  createController(){
    return new GetNewestPostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}