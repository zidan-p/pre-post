import { BaseController } from "~/common/core/controller.base";
import { DeletePostUseCase } from "./delete-post.use-case";
import { DeletePostDTORequest, DeletePostParam } from "./delete-post.dto";



export class DeletePostController extends BaseController {

  private useCase: DeletePostUseCase;
  
  constructor(useCase: DeletePostUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const param = this.getParams() as unknown as DeletePostParam;

    if(!param) return this.clientError("Invalid Param value");

    try {
      const result = await this.useCase.execute({param});
      
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