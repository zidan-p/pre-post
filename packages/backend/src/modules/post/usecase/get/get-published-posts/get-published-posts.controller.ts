import { BaseController } from "~/common/core/controller.base";
import { GetPublishedPostsUseCase } from "./get-published-posts.use-case";



export class GetPublishedPostsController extends BaseController {

  private useCase: GetPublishedPostsUseCase;
  
  constructor(useCase: GetPublishedPostsUseCase){
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