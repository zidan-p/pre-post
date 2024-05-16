import { BaseController } from "~/common/core/Controller.base";
import { UseCase } from "~/common/core/UseCase";
import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { IPostFactory } from "../../repository/post-creator.interface";
import { UpdatePostController } from "./update-post.controller";
import { UpdatePostUseCase } from "./update-post.use-case";
import { IPostMapperPresenterFactory } from "../../mappers/post-mapper.factory.interface";



export class UpdatePostManager implements IUseCaseManager{

  private controller: UpdatePostController;
  private useCase: UpdatePostUseCase;
  private postRepoFactory: IPostFactory;
  postMapperPresenterFactory: IPostMapperPresenterFactory

  constructor(postRepoFactory: IPostFactory, postMapperPresenterFactory: IPostMapperPresenterFactory){
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