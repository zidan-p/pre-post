import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteManyOwnedPostController } from "./delete-many-owned-post.controller";
import { DeleteManyOwnedPostUseCase } from "./delete-many-owned-post.use-case";


export class DeleteManyOwnedPostManager implements IUseCaseManager{

  private controller: DeleteManyOwnedPostController;
  private useCase: DeleteManyOwnedPostUseCase;

  constructor(){

    this.useCase = new DeleteManyOwnedPostUseCase()

    this.controller = new DeleteManyOwnedPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteManyOwnedPostUseCase()
  }

  createController(){
    return new DeleteManyOwnedPostController(this.useCase);
  }

}