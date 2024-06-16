import { IPostServiceFactory } from "../post-service.factory.interface";
import { IStorageService } from "../storage.service.interface";
import { LocalStorageService } from "./storage-service/storage.service";






export class PostServiceFactory implements IPostServiceFactory{ 
  constructor(
    private readonly storagePath: string
  ){}


  getStorageService(): IStorageService {
    return new LocalStorageService(this.storagePath);
  }

}