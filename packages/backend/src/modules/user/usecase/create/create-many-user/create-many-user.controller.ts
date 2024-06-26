import { BaseController } from "~/common/core/controller.base";
import { CreateManyUserUseCase } from "./create-many-user.use-case";
import { CreateManyUserDTOEnd } from "./create-many-user.dto";



export class CreateManyUserController extends BaseController<CreateManyUserDTOEnd> {

  constructor(
    private useCase: CreateManyUserUseCase
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