import { ExceptionBase } from "../exceptions";
import { IInteractor } from "./Interactor.interface";


export abstract class BaseController{

  protected abstract executeImpl(...args: any[]): Promise<any>;
  
  private interactor: IInteractor | undefined;

  // let interactor dynamic and can be null 
  //so it's not needed to create the object controller every request
  // constructor(){}


  // this is called by router
  executeRequest(interactor: IInteractor){
    this.interactor = interactor; // update interactor every execute

    const body: any = this.interactor.getRequestData();
    return this.executeImpl(body);
  }


  ok<T> (args: T, message?: string){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.ok(args, message);
  };

  created (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.created(message, metadata);
  };

  clientError (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.clientError(message, metadata);
  }; 
  unauthorized (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.unauthorized(message, metadata);
  } 
  paymentRequired (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.paymentRequired(message, metadata);
  }
  forbidden (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.forbidden(message, metadata);
  }
  notFound (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.notFound(message, metadata);
  }
  conflict (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.conflict(message, metadata);
  }
  tooMany (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor haven't been initialized");
      return;
    }
    return this.interactor.tooMany(message, metadata);
  }

  fail (message: string, error?: ExceptionBase, metadata?: Record<string, any>){
    return this.interactor.fail(message, error, metadata);
  }
}