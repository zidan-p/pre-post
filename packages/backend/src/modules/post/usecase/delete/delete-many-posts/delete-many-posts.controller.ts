import { BaseController } from "~/common/core/controller.base";
import { DeleteManyPostsUseCase } from "./delete-many-posts.use-case";



export class DeleteManyPostsController extends BaseController {

  private useCase: DeleteManyPostsUseCase;
  
  constructor(useCase: DeleteManyPostsUseCase){
    super();
    this.useCase = useCase;
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
      return this.ok();
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}