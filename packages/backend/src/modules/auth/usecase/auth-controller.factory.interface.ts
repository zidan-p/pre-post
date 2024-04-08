import { LoginController } from "./login/login.controller";
import { RefreshTokenController } from "./refresh-token/refresh-token.controller";




export interface IAuthUControllerFactory{

  getLoginController(): LoginController;
  getRefreshTokenController(): RefreshTokenController;

  createLoginController(...args: any): LoginController;
  createRefreshTokenController(...args: any): RefreshTokenController;
}