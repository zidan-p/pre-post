import { BaseController } from "~/common/core/controller.base";
import { UseCase } from "~/common/core/use-case";
import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { IPostRepositoryFactory } from "../../repository/post-creator.interface";
import { UpdatePostController } from "./update-post.controller";
import { UpdatePostUseCase } from "./update-post.use-case";
import { IPostMapperPresenterFactory } from "../../mappers/post-mapper.factory.interface";



export class UpdatePostManager implements IUseCaseManager{

  private controller: UpdatePostController;
  private useCase: UpdatePostUseCase;
  private postRepoFactory: IPostRepositoryFactory;
  postMapperPresenterFactory: IPostMapperPresenterFactory

  constructor(postRepoFactory: IPostRepositoryFactory, postMapperPresenterFactory: IPostMapperPresenterFactory){
    this.postMapperPresenterFactory = postMapperPresenterFactory;
    this.useCase = new UpdatePostUseCase(
      postRepoFactory.createPostImageRepo(),
      postRepoFactory.createUserRepo(),
      postRepoFactory.createPostRepo(),
    )

    this.controller = new UpdatePostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdatePostUseCase(
      this.postRepoFactory.createPostImageRepo(),
      this.postRepoFactory.createUserRepo(),
      this.postRepoFactory.createPostRepo(),
    )
  }

  createController(){
    return new UpdatePostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}