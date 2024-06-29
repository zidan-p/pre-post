import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPostBannerController } from "./get-post-banner.controller";
import { GetPostBannerUseCase } from "./get-post-banner.use-case";


export class GetPostBannerManager implements IUseCaseManager{

  private controller: GetPostBannerController;
  private useCase: GetPostBannerUseCase;

  constructor(){

    this.useCase = new GetPostBannerUseCase()

    this.controller = new GetPostBannerController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPostBannerUseCase()
  }

  createController(){
    return new GetPostBannerController(this.useCase);
  }

}