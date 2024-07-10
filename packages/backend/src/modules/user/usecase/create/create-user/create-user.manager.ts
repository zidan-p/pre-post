import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { CreateUserController } from "./create-user.controller";
import { CreateUserUseCase } from "./create-user.use-case";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";
import { IUserMapperPresenterFactory } from "~/modules/user/mapper/user-mapper.factory.interface.ts";


export class CreateUserManager implements IUseCaseManager{

  private controller: CreateUserController;
  private useCase: CreateUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory,
    private readonly userMapperPresenterFactory: IUserMapperPresenterFactory,
  ){

    this.useCase = new CreateUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new CreateUserController(
      this.useCase,
      this.userMapperPresenterFactory.getUserMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new CreateUserUseCase(
      this.userRepoFactory.getUserRepo()
    )
  }

  createController(){
    return new CreateUserController(
      this.useCase,
      this.userMapperPresenterFactory.getUserMapper()
    );
  }

}