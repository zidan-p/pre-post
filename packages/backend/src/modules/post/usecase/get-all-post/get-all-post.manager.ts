import { BaseController } from "~/common/core/controller.base";
import { UseCase } from "~/common/core/use-case";
import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { IPostRepositoryFactory } from "../../repository/post-creator.interface";
import { GetAllPostController } from "./get-all-post.controller";
import { GetAllPostUseCase } from "./get-all-post.use-case";
import { IPostMapperPresenterFactory } from "../../mappers/post-mapper.factory.interface";



export class GetAllManager implements IUseCaseManager{

  private controller: GetAllPostController;
  private useCase: GetAllPostUseCase;
  private postRepoFactory: IPostRepositoryFactory
  private postMapperPresenterFactory: IPostMapperPresenterFactory;

  constructor(postRepoFactory: IPostRepositoryFactory, postMapperPresenterFactory: IPostMapperPresenterFactory){
    this.postRepoFactory = postRepoFactory;
    this.postMapperPresenterFactory = postMapperPresenterFactory;

    this.useCase = new GetAllPostUseCase(
      postRepoFactory.createPostRepo()
    )

    this.controller = new GetAllPostController(this.useCase, this.postMapperPresenterFactory.createPostMapper());
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetAllPostUseCase(
      this.postRepoFactory.createPostRepo()
    )
  }

  createController(){
    return new GetAllPostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );

  }

}