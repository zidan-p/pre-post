import { BaseController } from "~/common/core/controller.base";
import { GetPostBannerUseCase } from "./get-post-banner.use-case";
import { GetPostBannerDTOEnd } from "./get-post-banner.dto";



export class GetPostBannerController extends BaseController<GetPostBannerDTOEnd> {

  constructor(
    private useCase: GetPostBannerUseCase
  ){
    super();
  }


  async executeImpl(){

    try {
      const result = await this.useCase.execute({});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      return this.ok(null, "Success Get post banner");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}