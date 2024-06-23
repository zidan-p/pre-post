import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateManyOwnedPostController } from "./update-many-owned-post.controller";
import { UpdateManyOwnedPostUseCase } from "./update-many-owned-post.use-case";


export class UpdateManyOwnedPostManager implements IUseCaseManager{

  private controller: UpdateManyOwnedPostController;
  private useCase: UpdateManyOwnedPostUseCase;

  constructor(){

    this.useCase = new UpdateManyOwnedPostUseCase()

    this.controller = new UpdateManyOwnedPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateManyOwnedPostUseCase()
  }

  createController(){
    return new UpdateManyOwnedPostController(this.useCase);
  }

}