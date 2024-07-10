import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteUserController } from "./delete-user.controller";
import { DeleteUserUseCase } from "./delete-user.use-case";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";
import { IUserMapperPresenterFactory } from "~/modules/user/mapper/user-mapper.factory.interface.ts";


export class DeleteUserManager implements IUseCaseManager{

  private controller: DeleteUserController;
  private useCase: DeleteUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory,
    private readonly userMapperPresenterFactory: IUserMapperPresenterFactory
  ){

    this.useCase = new DeleteUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new DeleteUserController(
      this.useCase,
      this.userMapperPresenterFactory.getUserMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteUserUseCase(
      this.userRepoFactory.getUserRepo()
    )
  }

  createController(){
    return new DeleteUserController(
      this.useCase,
      this.userMapperPresenterFactory.getUserMapper()
    );
  }

}