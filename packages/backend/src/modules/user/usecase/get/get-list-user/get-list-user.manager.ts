import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetListUserController } from "./get-list-user.controller";
import { GetListUserUseCase } from "./get-list-user.use-case";
import { IUserRepoFactory } from "~/modules/user/repository/user.repository.factory";
import { IUserMapperPresenterFactory } from "~/modules/user/mapper/user-mapper.factory.interface.ts";


export class GetListUserManager implements IUseCaseManager{

  private controller: GetListUserController;
  private useCase: GetListUserUseCase;

  constructor(
    private readonly userRepoFactory: IUserRepoFactory,
    private readonly userMapperPresenterFactory: IUserMapperPresenterFactory
  ){

    this.useCase = new GetListUserUseCase(
      this.userRepoFactory.getUserRepo()
    )

    this.controller = new GetListUserController(
      this.useCase, 
      this.userMapperPresenterFactory.getUserMapper(),
      this.userMapperPresenterFactory.getPaginateMapper(),
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetListUserUseCase(
      this.userRepoFactory.getUserRepo()
    )
  }

  createController(){
    return new GetListUserController(
      this.useCase, 
      this.userMapperPresenterFactory.getUserMapper(),
      this.userMapperPresenterFactory.getPaginateMapper(),
    );
  }

}