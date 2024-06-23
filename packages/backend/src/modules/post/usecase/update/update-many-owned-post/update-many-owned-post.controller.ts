import { BaseController } from "~/common/core/controller.base";
import { UpdateManyOwnedPostUseCase } from "./update-many-owned-post.use-case";
import { UpdateManyOwnedPostDTOEnd } from "./update-many-owned-post.dto";



export class UpdateManyOwnedPostController extends BaseController<UpdateManyOwnedPostDTOEnd> {

  constructor(
    private useCase: UpdateManyOwnedPostUseCase
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
      return this.ok(null, "Success Update many owned post");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}