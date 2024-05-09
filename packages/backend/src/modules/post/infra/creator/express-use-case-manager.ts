import { NextFunction, Request, Response } from "express";
import { UseCaseManagerFactory } from "~/common/core/use-case-manager.factory";
import { ExpressInteractor } from "~/common/infra/http/interactor/express.interactor";






export class ExpressUseCaseManagerFactory extends UseCaseManagerFactory{


  executeRequest(name: string){

    return (req: Request, res: Response, next: NextFunction) => {
      return this.getUseCaseManager(name).getController().executeRequest(new ExpressInteractor(req, res));
    }
    
  }
}