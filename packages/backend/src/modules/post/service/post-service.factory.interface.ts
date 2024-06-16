import { IStorageService } from "./storage.service.interface";





export interface IPostServiceFactory{
  
  getStorageService(): IStorageService;
}