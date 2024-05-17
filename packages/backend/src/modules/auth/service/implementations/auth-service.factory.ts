import { IAuthServiceFactory } from "../auth-service.factory.interface";
import { IJWTService } from "../jwt.service.interface";
import { JWTServiceImpl } from "./jwt/auth.service";





export class AuthServiceFactory implements IAuthServiceFactory{

  createJwtService(): IJWTService {
    return new JWTServiceImpl()
  }
  
}