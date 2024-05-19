import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeletePostController } from "./delete-post.controller";
import { DeletePostUseCase } from "./delete-post.use-case";
import { IPostRepositoryFactory } from "../../repository/post-creator.interface";


export class __usecase_PascalCase__Manager implements IUseCaseManager{

  private controller: DeletePostController;
  private useCase: DeletePostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory
  ){

    this.useCase = new DeletePostUseCase( this.postRepoFactory.createPostRepo());

    this.controller = new DeletePostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeletePostUseCase(this.postRepoFactory.createPostRepo())
  }

  createController(){
    return new DeletePostController(this.useCase);
  }

}