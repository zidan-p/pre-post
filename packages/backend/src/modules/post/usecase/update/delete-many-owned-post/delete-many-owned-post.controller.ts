import { BaseController } from "~/common/core/controller.base";
import { DeleteManyOwnedPostUseCase } from "./delete-many-owned-post.use-case";
import { DeleteManyOwnedPostDTOEnd } from "./delete-many-owned-post.dto";



export class DeleteManyOwnedPostController extends BaseController<DeleteManyOwnedPostDTOEnd> {

  constructor(
    private useCase: DeleteManyOwnedPostUseCase
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
      return this.ok(undefined, "Success Delete many owned post");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}