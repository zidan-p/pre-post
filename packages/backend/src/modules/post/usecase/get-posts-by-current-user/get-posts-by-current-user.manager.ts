import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPostsByCurrentUserController } from "./get-posts-by-current-user.controller";
import { GetPostsByCurrentUserUseCase } from "./get-posts-by-current-user.use-case";


export class __usecase_PascalCase__Manager implements IUseCaseManager{

  private controller: GetPostsByCurrentUserController;
  private useCase: GetPostsByCurrentUserUseCase;

  constructor(){

    this.useCase = new GetPostsByCurrentUserUseCase()

    this.controller = new GetPostsByCurrentUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPostsByCurrentUserUseCase()
  }

  createController(){
    return new GetPostsByCurrentUserController(this.useCase);
  }

}