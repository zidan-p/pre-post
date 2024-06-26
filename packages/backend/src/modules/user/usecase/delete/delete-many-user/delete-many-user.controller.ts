import { BaseController } from "~/common/core/controller.base";
import { DeleteManyUserUseCase } from "./delete-many-user.use-case";
import { DeleteManyUserDTOEnd } from "./delete-many-user.dto";



export class DeleteManyUserController extends BaseController<DeleteManyUserDTOEnd> {

  constructor(
    private useCase: DeleteManyUserUseCase
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