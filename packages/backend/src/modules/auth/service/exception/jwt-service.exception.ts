import { ServiceError } from "~/common/core/service-error.base";


export const AuthServiceErrorCodes = {
  JSON_ERROR : "AUTH.JSON_ERROR",
  EXPIRED : "AUTH.EXPIRED",
}


export namespace JWTServiceErrors{


  export class JSONIssue extends ServiceError{
    code: string = AuthServiceErrorCodes.JSON_ERROR;
    
    constructor(message: string = "Failed JWT Operation", cause?: Error){
      super(message, cause);
    }
  }

  export class ExpiredJWT extends ServiceError{
    code: string = AuthServiceErrorCodes.JSON_ERROR;
    
    constructor(message: string = "Failed JWT Operation", cause?: Error){
      super(message, cause);
    }
  }
  
}