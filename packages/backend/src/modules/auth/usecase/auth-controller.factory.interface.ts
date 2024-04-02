import { LoginController } from "./login/login.controller";




export interface IAuthUControllerFactory{
  createLoginController(...args: any): LoginController;
}