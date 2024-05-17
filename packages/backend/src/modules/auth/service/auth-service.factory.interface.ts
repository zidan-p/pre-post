import { IJWTService } from "./jwt.service.interface";




/**i dont think it's needed yet */
export interface IAuthServiceFactory{

  createJwtService(...args: any[]): IJWTService
}