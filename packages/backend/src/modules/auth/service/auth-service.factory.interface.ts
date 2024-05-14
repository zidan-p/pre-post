import { IJWTService } from "./jwt.service.interface";




/**i dont think it's needed yet */
export interface IJWTServiceFactory{

  createJwtService(...args: any[]): IJWTService
}