import { IJWTServiceFactory } from "../auth-service.factory.interface";
import { IJWTService } from "../jwt.service.interface";
import { JWTServiceImpl } from "./jwt/auth.service";





export class AuthServiceFactory implements IJWTServiceFactory{

  createJwtService(): IJWTService {
    return new JWTServiceImpl()
  }
  
}