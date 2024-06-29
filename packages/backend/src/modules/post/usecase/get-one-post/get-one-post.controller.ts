import { BaseController } from "~/common/core/controller.base";
import { GetOnePostUseCase } from "./get-one-post.use-case";
import { GetOnePostDTOEnd } from "./get-one-post.dto";



export class GetOnePostController extends BaseController<GetOnePostDTOEnd> {

  constructor(
    private useCase: GetOnePostUseCase
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
      return this.ok(null, "Success Get one post");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}