import { BaseController } from "~/common/core/controller.base";
import { GetPostBannerUseCase } from "./get-post-banner.use-case";
import { GetPostBannerDTOEnd, GetPostBannerParams } from "./get-post-banner.dto";
import { GetPostBannerUseCaseErrors } from "./get-post-banner.error";



export class GetPostBannerController extends BaseController<GetPostBannerDTOEnd> {

  constructor(
    private useCase: GetPostBannerUseCase
  ){
    super();
  }


  async executeImpl(){

    const params = this.getParams() as unknown as GetPostBannerParams;
    const user = this.getUser() ?? undefined;
    try {
      const result = await this.useCase.execute({params, user});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof GetPostBannerUseCaseErrors.InvalidId:
            return this.clientError(exception.message, exception.metadata as Record<string, any>);
          case error instanceof GetPostBannerUseCaseErrors.PostNotFound:
          case error instanceof GetPostBannerUseCaseErrors.BannerNotFound:
          case error instanceof GetPostBannerUseCaseErrors.UserNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      // shoudl i map it first ???
      return this.okFile(result.value.getValue().banner);
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}