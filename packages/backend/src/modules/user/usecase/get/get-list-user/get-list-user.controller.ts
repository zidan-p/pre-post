import { BaseController } from "~/common/core/controller.base";
import { GetListUserUseCase } from "./get-list-user.use-case";
import { GetListUserDTOEnd } from "./get-list-user.dto";



export class GetListUserController extends BaseController<GetListUserDTOEnd> {

  constructor(
    private useCase: GetListUserUseCase
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
      // return this.ok(null, "Success User");
      return this.okBuild();
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}