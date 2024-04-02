import { IAuthService } from "./auth.service.interface";




/**i dont think it's needed yet */
export interface IAuthServiceFactory{

  createAuthService(...args: any[]): IAuthService
}