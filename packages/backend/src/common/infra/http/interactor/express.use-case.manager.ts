import { NextFunction, Request, Response } from "express";
import { UseCaseManagerFactory } from "~/common/core/use-case-manager.factory";
import { ExpressInteractor } from "./express.interactor";
import { InternalServerErrorException } from "~/common/exceptions";





export class ExpressUseCaseManagerFactory extends UseCaseManagerFactory{
  executeRequest(name: string){

    return (req: Request, res: Response, next: NextFunction) => {
      const useCaseManager = this.getUseCaseManager(name);
      if(!useCaseManager){
        throw new InternalServerErrorException("Use case [ " + name + " ] not found.");
      }

      return useCaseManager.getController().executeRequest(new ExpressInteractor(req, res));
    }
  }

  getController(name: string){
    const useCaseManager = this.getUseCaseManager(name);
    if(!useCaseManager){
      throw new InternalServerErrorException("Use case [ " + name + " ] not found.");
    }
    return (req: Request, res: Response, next?: NextFunction) => useCaseManager.getController().executeRequest(new ExpressInteractor(req, res));
  }



  executeNewRequest(name: string){
    const useCaseManager = this.getUseCaseManager(name);
    if(!useCaseManager){
      throw new InternalServerErrorException("Use case [ " + name + " ] not found.");
    }
    return (req: Request, res: Response, next?: NextFunction) => {
      console.log("create controller called : " + name)
      if(!useCaseManager.createController) throw new InternalServerErrorException("Use case [ " + name + " ] does not have a controller.");
      const controller = useCaseManager.createController()
      return controller.executeRequest(new ExpressInteractor(req, res));
    }
  }

}