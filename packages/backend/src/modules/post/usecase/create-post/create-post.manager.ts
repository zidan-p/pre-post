import { BaseController } from "~/common/core/controller.base";
import { UseCase } from "~/common/core/use-case";
import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { IPostFactory } from "../../repository/post-creator.interface";
import { CreatePostController } from "./create-post.controller";
import { CreatePostUseCase } from "./create-post.use-case";



export class CreatePostManager implements IUseCaseManager{

  private controller: CreatePostController;
  private useCase: CreatePostUseCase;
  private postRepoFactory: IPostFactory

  constructor(postRepoFactory: IPostFactory){

    this.useCase = new CreatePostUseCase(
      postRepoFactory.createPostImageRepo(),
      postRepoFactory.createUserRepo(),
      postRepoFactory.createPostRepo(),
    )

    this.controller = new CreatePostController(this.useCase);
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
    return new CreatePostController(this.useCase);
  }

}