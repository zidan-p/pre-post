import { BaseController } from "~/common/core/controller.base";
import { DeleteUserUseCase } from "./delete-user.use-case";
import { DeleteUserDTOEnd } from "./delete-user.dto";



export class DeleteUserController extends BaseController<DeleteUserDTOEnd> {

  constructor(
    private useCase: DeleteUserUseCase
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