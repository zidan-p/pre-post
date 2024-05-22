import { BaseController } from "~/common/core/controller.base";
import { GetPublishedPostByOwnerUseCase } from "./get-published-post-by-owner.use-case";



export class GetPublishedPostByOwnerController extends BaseController {

  private useCase: GetPublishedPostByOwnerUseCase;
  
  constructor(useCase: GetPublishedPostByOwnerUseCase){
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