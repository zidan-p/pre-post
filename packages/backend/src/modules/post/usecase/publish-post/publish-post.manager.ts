import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { PublishPostController } from "./publish-post.controller";
import { PublishPostUseCase } from "./publish-post.use-case";


export class __usecase_PascalCase__Manager implements IUseCaseManager{

  private controller: PublishPostController;
  private useCase: PublishPostUseCase;

  constructor(){

    this.useCase = new PublishPostUseCase()

    this.controller = new PublishPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new PublishPostUseCase()
  }

  createController(){
    return new PublishPostController(this.useCase);
  }

}