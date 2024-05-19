import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPostsByUserController } from "./get-posts-by-user.controller";
import { GetPostsByUserUseCase } from "./get-posts-by-user.use-case";


export class __usecase_PascalCase__Manager implements IUseCaseManager{

  private controller: GetPostsByUserController;
  private useCase: GetPostsByUserUseCase;

  constructor(){

    this.useCase = new GetPostsByUserUseCase()

    this.controller = new GetPostsByUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPostsByUserUseCase()
  }

  createController(){
    return new GetPostsByUserController(this.useCase);
  }

}