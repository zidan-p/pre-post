import { BaseController } from "~/common/core/controller.base";
import { GetPostsByCurrentUserUseCase } from "./get-posts-by-current-user.use-case";



export class GetPostsByCurrentUserController extends BaseController {

  private useCase: GetPostsByCurrentUserUseCase;
  
  constructor(useCase: GetPostsByCurrentUserUseCase){
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