import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { IUserRepo } from "../../repository/user.repository.port";
import { IJWTService } from "../../service/jwt.service.interface";
import { LoginController } from "./login.controller"
import { LoginUseCase } from "./login.use-case";


export class LoginManager implements IUseCaseManager{

  private controller: LoginController;
  private useCase: LoginUseCase

  userRepo: IUserRepo;
  authService: IJWTService;

  constructor(userepo: IUserRepo, authService: IJWTService){
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

  createController(){
    return new LoginController(this.useCase);
  }

}