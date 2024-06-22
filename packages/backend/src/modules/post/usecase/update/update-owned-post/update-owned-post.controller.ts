import { BaseController } from "~/common/core/controller.base";
import { UpdateOwnedPostUseCase } from "./update-owned-post.use-case";
import { UpdateOwnedPostDTOEnd } from "./update-owned-post.dto";



export class UpdateOwnedPostController extends BaseController<UpdateOwnedPostDTOEnd> {

  constructor(
    private useCase: UpdateOwnedPostUseCase
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
      return this.ok(undefined, "Success Update owned post");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}