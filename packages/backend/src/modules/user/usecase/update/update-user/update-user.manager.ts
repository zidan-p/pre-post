import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateUserController } from "./update-user.controller";
import { UpdateUserUseCase } from "./update-user.use-case";
import { IUserMapperPresenterFactory } from "~/modules/user/mapper/user-mapper.factory.interface.ts";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";


export class UpdateUserManager implements IUseCaseManager{

  private controller: UpdateUserController;
  private useCase: UpdateUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory,
    private readonly userMapperPresenterFactory: IUserMapperPresenterFactory,
  ){

    this.useCase = new UpdateUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new UpdateUserController(
      this.useCase,
      this.userMapperPresenterFactory.getUserMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateUserUseCase(this.userRepoFactory.getUserRepo())
  }

  createController(){
    return new UpdateUserController(
      this.useCase,
      this.userMapperPresenterFactory.getUserMapper()
    );
  }

}