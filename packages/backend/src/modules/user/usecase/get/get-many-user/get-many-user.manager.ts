import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetManyUserController } from "./get-many-user.controller";
import { GetManyUserUseCase } from "./get-many-user.use-case";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";
import { IUserMapperPresenterFactory } from "~/modules/user/mapper/user-mapper.factory.interface.ts";


export class GetManyUserManager implements IUseCaseManager{

  private controller: GetManyUserController;
  private useCase: GetManyUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory,
    private readonly userMapperPresenterFactory: IUserMapperPresenterFactory
  ){

    this.useCase = new GetManyUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new GetManyUserController(
      this.useCase,
      this.userMapperPresenterFactory.getUserMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetManyUserUseCase(
      this.userRepoFactory.getUserRepo()
    )
  }

  createController(){
    return new GetManyUserController(
      this.useCase,
      this.userMapperPresenterFactory.getUserMapper()
    );
  }

}