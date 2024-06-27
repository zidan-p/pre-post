import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetUserController } from "./get-user.controller";
import { GetUserUseCase } from "./get-user.use-case";
import { IUserMapperPresenterFactory } from "~/modules/user/mapper/user-mapper.factory.interface.ts";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";


export class GetUserManager implements IUseCaseManager{

  private controller: GetUserController;
  private useCase: GetUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory,
    private readonly userMapperPresenterFactory: IUserMapperPresenterFactory,
  ){

    this.useCase = new GetUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new GetUserController(
      this.useCase, this.userMapperPresenterFactory.getUserMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetUserUseCase(this.userRepoFactory.getUserRepo())
  }

  createController(){
    return new GetUserController( this.useCase, this.userMapperPresenterFactory.getUserMapper());
  }

}