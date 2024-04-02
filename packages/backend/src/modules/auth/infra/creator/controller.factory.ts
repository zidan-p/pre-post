import { Request, Response } from "express";
import { IAuthUControllerFactory } from "../../usecase/auth-controller.factory.interface";
import { LoginController } from "../../usecase/login/login.controller";
import { ExpressInteractor } from "~/common/infra/http/interactor/express.interactor";
import { LoginUseCase } from "../../usecase/login/login.use-case";
import { IUserRepo } from "../../repository/user.repository.port";
import { IAuthService } from "../../service/auth.service.interface";






export class AuthControllerFactory implements IAuthUControllerFactory{

  constructor(
    private readonly userRepository: IUserRepo,
    private readonly authService: IAuthService,
  ){}

  createLoginController(req: Request, res: Response): LoginController {
    return new LoginController(new ExpressInteractor(req, res), new LoginUseCase(this.userRepository, this.authService));
  }
  
}