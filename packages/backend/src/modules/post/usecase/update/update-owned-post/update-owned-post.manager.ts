import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateOwnedPostController } from "./update-owned-post.controller";
import { UpdateOwnedPostUseCase } from "./update-owned-post.use-case";


export class UpdateOwnedPostManager implements IUseCaseManager{

  private controller: UpdateOwnedPostController;
  private useCase: UpdateOwnedPostUseCase;

  constructor(){

    this.useCase = new UpdateOwnedPostUseCase()

    this.controller = new UpdateOwnedPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateOwnedPostUseCase()
  }

  createController(){
    return new UpdateOwnedPostController(this.useCase);
  }

}