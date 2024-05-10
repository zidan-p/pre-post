import { BaseController } from "~/common/core/Controller.base";
import { UseCase } from "~/common/core/UseCase";
import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { IPostFactory } from "../../repository/post-creator.interface";
import { CreatePostController } from "./update-post.controller";
import { CreatePostUseCase } from "./update-post.use-case";



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