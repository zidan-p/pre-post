import { BaseController } from "~/common/core/controller.base";
import { GetUserUseCase } from "./get-user.use-case";
import { GetUserDTOEnd } from "./get-user.dto";



export class GetUserController extends BaseController<GetUserDTOEnd> {

  constructor(
    private useCase: GetUserUseCase
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
      // return this.ok(null, "Success usersentenceCase__");
      return this.okBuild()
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}