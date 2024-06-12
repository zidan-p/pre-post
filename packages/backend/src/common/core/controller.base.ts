import { ICommonFile } from "../domain/common/common-file.interface";
import { ExceptionBase } from "../exceptions";
import { IInteractor, OKBuilderResponse } from "./Interactor.interface";
import { IUserAuth } from "./user.auth.interface";


export abstract class BaseController<TEndDto = any, TControllerOkResult = any>{

  abstract executeImpl(...args: any[]): Promise<IInteractor["ok"]>;
  
  protected interactor: IInteractor<TControllerOkResult> | undefined;

  // let interactor dynamic and can be null 
  //so it's not needed to create the object controller every request
  // constructor(){}


  // this is called by router
  executeRequest(interactor: IInteractor){
    this.interactor = interactor; // update interactor every execute

    const body: any = this.interactor.getRequestData();
    return this.executeImpl(body);
  }

  getParams(): Record<string, string> | undefined;
  getParams(name: string): string | undefined;
  getParams(name?: string){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }

    if(name){
      const value = this.interactor.getRequestParams(name);
      return value;
    }

    return this.interactor.getRequestParams();
    
  }

  // return specified field, if not then return all data
  getBody(bodyField?: string){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }

    if(bodyField) return this.interactor.getRequestData(bodyField);
    return this.interactor.getRequestData();
  }

  // return specified field, if not then return all data
  getHeader(headerField?: string){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }

    if(headerField) return this.interactor.getHeaderData(headerField);
    return this.interactor.getHeaderData();
  }

  /**
   * get value from query param in url..
   */
  getQueryData(): Record<string, any> | null;
  getQueryData(field:string): string | null;
  getQueryData(field?:string): string | Record<string, any> | null{
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return null;
    }
    if(field) return this.interactor.getQueryData(field);
    return this.interactor.getQueryData();

  }

  /**
   * get current user of request
   * @returns 
   */
  getUser(): IUserAuth | null{
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return null;
    }

    return this.interactor.getUser() ?? null;
  }


  /**
   * get file from interactor. 
   * this method assume the file is stored in Record<string, IComminFile[]> format.
   * @param filename 
   * @returns 
   */
  getFiles(filename: string): ICommonFile[] | null;
  getFiles() : Record<string, ICommonFile[]> | null;
  getFiles(filename?: string): ICommonFile[] | Record<string, ICommonFile[]> | null{
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return null;
    }
    if(filename){
      return this.interactor.getFilesRecord(filename);
    }

    return this.interactor.getFilesRecord();
  }

  /**
   * get array of file from one field.
   * this method assume the file is stored in ICommonFile[] format.
   * like single input in form that accept multiple files
   * @returns 
   */
  getSingleArrayFile(){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.getSingleArrayFiles();
  }

  /**
   * get single file from one field.
   * assumed the file is uploaded by single field that only accept one file
   * @returns 
   */
  getSingleFile(){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.getSingleFile();
  }

  ok<T extends TEndDto> (args?: T, message?: string);
  ok<T extends TEndDto> (args: T, message?: string){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.ok<T>(args, message);
  };

  okBuild<T>(args?: OKBuilderResponse<T>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.okBuild(args);
  }

  created (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.created(message, metadata);
  };

  clientError (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.clientError(message, metadata);
  }; 

  unauthorized (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.unauthorized(message, metadata);
  } 

  paymentRequired (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.paymentRequired(message, metadata);
  }

  forbidden (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.forbidden(message, metadata);
  }

  notFound (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.notFound(message, metadata);
  }

  conflict (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.conflict(message, metadata);
  }
  
  tooMany (message: string, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.tooMany(message, metadata);
  }

  fail (message: string, error?: ExceptionBase, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }
    return this.interactor.fail(message, error as ExceptionBase, metadata);
  }

  failBuild(errors: ExceptionBase, metadata?: Record<string, any>){
    if(!this.interactor){
      console.error("interactor hasn't been initialized");
      return;
    }

    return this.interactor.failBuild({
      errors, metadata
    })
  }
}