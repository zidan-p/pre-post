import { BaseController } from "~/common/core/controller.base";
import { UseCase } from "~/common/core/use-case";
import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { IPostRepositoryFactory } from "../../../repository/post-creator.interface";
import { CreatePostController } from "./create-post.controller";
import { CreatePostUseCase } from "./create-post.use-case";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";



export class CreatePostManager implements IUseCaseManager{

  private controller: CreatePostController<Record<string, any>>;
  private useCase: CreatePostUseCase;
  private postRepoFactory: IPostRepositoryFactory

  constructor(
    postRepoFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new CreatePostUseCase(
      postRepoFactory.createPostImageRepo(),
      postRepoFactory.createUserRepo(),
      postRepoFactory.createPostRepo(),
    )

    this.controller = new CreatePostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new CreatePostUseCase(
      this.postRepoFactory.createPostImageRepo(),
      this.postRepoFactory.createUserRepo(),
      this.postRepoFactory.createPostRepo(),
    )
  }

  createController(){
    return new CreatePostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }
}