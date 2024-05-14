import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { RefreshTokenController } from "./refresh-token.controller";
import { RefreshTokenUseCase } from "./refresh-token.use-case";
import { IUserRepo } from "../../repository/user.repository.port";
import { IJWTService } from "../../service/jwt.service.interface";



export class RefreshTokenManager implements IUseCaseManager{


  private controller: RefreshTokenController;
  private useCase: RefreshTokenUseCase;

  private userRepo: IUserRepo;
  private authService: IJWTService;

  constructor(userepo: IUserRepo, authService: IJWTService){
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
  createController(){
    return new RefreshTokenController(this.useCase);
  }
  
}