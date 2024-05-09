import { IUseCaseManager } from "./use-case.manager.interface";





export interface IUsecaseManagerFactory{


  getUseCaseManager: (name: string) => IUseCaseManager;
}