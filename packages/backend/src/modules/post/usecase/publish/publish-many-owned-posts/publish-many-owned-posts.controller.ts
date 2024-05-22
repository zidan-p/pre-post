import { BaseController } from "~/common/core/controller.base";
import { PublishManyOwnedPostsUseCase } from "./publish-many-owned-posts.use-case";



export class PublishManyOwnedPostsController extends BaseController {

  private useCase: PublishManyOwnedPostsUseCase;
  
  constructor(useCase: PublishManyOwnedPostsUseCase){
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