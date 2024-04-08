import { IUseCaseFactory } from "~/common/core/use-case.factory.interface";
import { IUserRepo } from "../../repository/user.repository.port";
import { IAuthService } from "../../service/auth.service.interface";
import { LoginController } from "./login.controller"
import { LoginUseCase } from "./login.use-case";


export class LoginFactory implements IUseCaseFactory{

  private controller: LoginController;
  private useCase: LoginUseCase

  userRepo: IUserRepo;
  authService: IAuthService;

  constructor(userepo: IUserRepo, authService: IAuthService){
    this.userRepo = userepo;
    this.authService = authService;
    this.useCase = new LoginUseCase(userepo, authService);
    this.controller = new LoginController(this.useCase);
  }
  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new LoginUseCase(this.userRepo, this.authService);
  }

  getNewControllerInstance(){
    return new LoginController(this.useCase);
  }

}