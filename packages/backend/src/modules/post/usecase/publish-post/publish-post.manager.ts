import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { PublishPostController } from "./publish-post.controller";
import { PublishPostUseCase } from "./publish-post.use-case";
import { IPostRepositoryFactory } from "../../repository/post-creator.interface";


export class __usecase_PascalCase__Manager implements IUseCaseManager{

  private controller: PublishPostController;
  private useCase: PublishPostUseCase;

  constructor(
    private readonly postRepositoryFactory: IPostRepositoryFactory
  ){

    this.useCase = new PublishPostUseCase(postRepositoryFactory.createPostRepo())

    this.controller = new PublishPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new PublishPostUseCase(this.postRepositoryFactory.createPostRepo())
  }

  createController(){
    return new PublishPostController(this.useCase);
  }

}