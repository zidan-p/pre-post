import { BaseController } from "~/common/core/Controller.base";
import { UseCase } from "~/common/core/UseCase";
import { IUseCaseFactory } from "~/common/core/use-case.factory.interface";
import { RefreshTokenController } from "./refresh-token.controller";
import { RefreshTokenUseCase } from "./refresh-token.use-case";
import { IUserRepo } from "../../repository/user.repository.port";
import { IAuthService } from "../../service/auth.service.interface";



export class RefreshTokenFactory implements IUseCaseFactory{


  private controller: RefreshTokenController;
  private useCase: RefreshTokenUseCase;

  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(userepo: IUserRepo, authService: IAuthService){
    this.userRepo = userepo;
    this.authService = authService;

    this.useCase = new RefreshTokenUseCase(userepo, authService);
    this.controller = new RefreshTokenController(this.useCase);
  }
  
  getController(){ return this.controller};
  getUseCase(){ return this.useCase};


  getNewUseCaseInstance(){
    return new RefreshTokenUseCase(this.userRepo, this.authService);
  };
  getNewControllerInstance(){
    return new RefreshTokenController(this.useCase);
  }
  
}