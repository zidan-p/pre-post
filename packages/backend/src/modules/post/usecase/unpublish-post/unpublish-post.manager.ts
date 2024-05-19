import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UnpublishPostController } from "./unpublish-post.controller";
import { UnpublishPostUseCase } from "./unpublish-post.use-case";


export class __usecase_PascalCase__Manager implements IUseCaseManager{

  private controller: UnpublishPostController;
  private useCase: UnpublishPostUseCase;

  constructor(){

    this.useCase = new UnpublishPostUseCase()

    this.controller = new UnpublishPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UnpublishPostUseCase()
  }

  createController(){
    return new UnpublishPostController(this.useCase);
  }

}