import { Request, Response } from "express";
import { IAuthUControllerFactory } from "../../usecase/auth-controller.factory.interface";
import { LoginController } from "../../usecase/login/login.controller";
import { ExpressInteractor } from "~/common/infra/http/interactor/express.interactor";
import { LoginUseCase } from "../../usecase/login/login.use-case";
import { IUserRepo } from "../../repository/user.repository.port";
import { IAuthService } from "../../service/auth.service.interface";
import { RefreshTokenController } from "../../usecase/refresh-token/refresh-token.controller";
import { RefreshTokenFactory } from "../../usecase/refresh-token/refresh-token.factory";
import { LoginFactory } from "../../usecase/login/login.factory";
import { RefreshTokenUseCase } from "../../usecase/refresh-token/refresh-token.use-case";






export class AuthControllerFactory implements IAuthUControllerFactory{

  private refreshTokenFactory: RefreshTokenFactory;
  private loginFactory: LoginFactory;

  constructor(
    private readonly userRepository: IUserRepo,
    private readonly authService: IAuthService,
  ){
    this.refreshTokenFactory = new RefreshTokenFactory(userRepository, authService);
    this.loginFactory = new LoginFactory(userRepository, authService);
    
  }
  getLoginController(): LoginController {
    return this.loginFactory.getController();
  }

  getRefreshTokenController(): RefreshTokenController {
    return this.refreshTokenFactory.getController();
  }

  createRefreshTokenController(...args: any): RefreshTokenController {
    return new RefreshTokenController(new RefreshTokenUseCase(this.userRepository, this.authService));
  }

  createLoginController(): LoginController {
    return new LoginController(new LoginUseCase(this.userRepository, this.authService));
  }

  
  
}