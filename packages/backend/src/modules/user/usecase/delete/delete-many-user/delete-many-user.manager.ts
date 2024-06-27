import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteManyUserController } from "./delete-many-user.controller";
import { DeleteManyUserUseCase } from "./delete-many-user.use-case";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";


export class DeleteManyUserManager implements IUseCaseManager{

  private controller: DeleteManyUserController;
  private useCase: DeleteManyUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory
  ){

    this.useCase = new DeleteManyUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new DeleteManyUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteManyUserUseCase(
      this.userRepoFactory.getUserRepo()
    )
  }

  createController(){
    return new DeleteManyUserController(this.useCase);
  }

}