import { IUseCaseManager } from "./use-case.manager.interface";





export interface IUsecaseManagerFactory{


  // because it from map object so it's possible to return undefined value
  getUseCaseManager: (name: string) => IUseCaseManager | undefined;
}