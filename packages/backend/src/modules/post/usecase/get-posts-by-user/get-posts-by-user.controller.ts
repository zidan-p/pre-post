import { BaseController } from "~/common/core/controller.base";
import { GetPostsByUserUseCase } from "./get-posts-by-user.use-case";



export class GetPostsByUserController extends BaseController {

  private useCase: GetPostsByUserUseCase;
  
  constructor(useCase: GetPostsByUserUseCase){
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