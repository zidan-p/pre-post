import { IUsecaseManagerFactory } from "./use-case-manager.factory.port";
import { IUseCaseManager } from "./use-case.manager.interface";





export class UseCaseManagerFactory implements IUsecaseManagerFactory{

  private useCaseManagers: Map<string, IUseCaseManager> = new Map();

  addUseCaseManager(name: string, useCaseManager: IUseCaseManager){
    this.useCaseManagers.set(name, useCaseManager);
  }

  getUseCaseManager(name: string){
    return this.useCaseManagers.get(name);
  };
  
}