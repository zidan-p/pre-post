import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { CreateUserController } from "./create-user.controller";
import { CreateUserUseCase } from "./create-user.use-case";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";


export class CreateUserManager implements IUseCaseManager{

  private controller: CreateUserController;
  private useCase: CreateUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory
  ){

    this.useCase = new CreateUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new CreateUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new CreateUserUseCase(
      this.userRepoFactory.getUserRepo()
    )
  }

  createController(){
    return new CreateUserController(this.useCase);
  }

}