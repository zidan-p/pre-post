import { BaseController } from "~/common/core/controller.base";
import { UpdateUserUseCase } from "./update-user.use-case";
import { UpdateUserDTOEnd } from "./update-user.dto";



export class UpdateUserController extends BaseController<UpdateUserDTOEnd> {

  constructor(
    private useCase: UpdateUserUseCase
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
      return this.okBuild();
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}