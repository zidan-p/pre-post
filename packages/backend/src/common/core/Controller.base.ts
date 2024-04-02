import { ExceptionBase } from "../exceptions";
import { IInteractor } from "./Interactor.interface";


export abstract class BaseController{

  protected abstract executeImpl(...args: any[]): Promise<any>;
  
  constructor(
    private readonly interactor: IInteractor
  ){}



  ok<T> (args: T, message?: string){
    return this.interactor.ok(args, message);
  };

  created (message: string, metadata?: Record<string, any>){
    return this.interactor.created(message, metadata);
  };

  clientError (message: string, metadata?: Record<string, any>){
    return this.interactor.clientError(message, metadata);
  }; 
  unauthorized (message: string, metadata?: Record<string, any>){
    return this.interactor.unauthorized(message, metadata);
  } 
  paymentRequired (message: string, metadata?: Record<string, any>){
    return this.interactor.paymentRequired(message, metadata);
  }
  forbidden (message: string, metadata?: Record<string, any>){
    return this.interactor.forbidden(message, metadata);
  }
  notFound (message: string, metadata?: Record<string, any>){
    return this.interactor.notFound(message, metadata);
  }
  conflict (message: string, metadata?: Record<string, any>){
    return this.interactor.conflict(message, metadata);
  }
  tooMany (message: string, metadata?: Record<string, any>){
    return this.interactor.tooMany(message, metadata);
  }

  fail (message: string, error?: ExceptionBase, metadata?: Record<string, any>){
    return this.interactor.fail(message, error, metadata);
  }
}