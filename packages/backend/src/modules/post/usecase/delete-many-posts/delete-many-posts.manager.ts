import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteManyPostsController } from "./delete-many-posts.controller";
import { DeleteManyPostsUseCase } from "./delete-many-posts.use-case";


export class DeleteManyPostsManager implements IUseCaseManager{

  private controller: DeleteManyPostsController;
  private useCase: DeleteManyPostsUseCase;

  constructor(){

    this.useCase = new DeleteManyPostsUseCase()

    this.controller = new DeleteManyPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteManyPostsUseCase()
  }

  createController(){
    return new DeleteManyPostsController(this.useCase);
  }

}