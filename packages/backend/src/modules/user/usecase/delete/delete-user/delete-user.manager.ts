import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteUserController } from "./delete-user.controller";
import { DeleteUserUseCase } from "./delete-user.use-case";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";


export class DeleteUserManager implements IUseCaseManager{

  private controller: DeleteUserController;
  private useCase: DeleteUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory
  ){

    this.useCase = new DeleteUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new DeleteUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteUserUseCase(
      this.userRepoFactory.getUserRepo()
    )
  }

  createController(){
    return new DeleteUserController(this.useCase);
  }

}