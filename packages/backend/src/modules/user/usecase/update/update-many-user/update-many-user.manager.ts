import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateManyUserController } from "./update-many-user.controller";
import { UpdateManyUserUseCase } from "./update-many-user.use-case";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";


export class UpdateManyUserManager implements IUseCaseManager{

  private controller: UpdateManyUserController;
  private useCase: UpdateManyUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory
  ){

    this.useCase = new UpdateManyUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new UpdateManyUserController(
      this.useCase
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateManyUserUseCase(this.userRepoFactory.getUserRepo())
  }

  createController(){
    return new UpdateManyUserController(this.useCase);
  }

}