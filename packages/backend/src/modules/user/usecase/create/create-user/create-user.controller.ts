import { BaseController } from "~/common/core/controller.base";
import { CreateUserUseCase } from "./create-user.use-case";
import { CreateUserDTOEnd } from "./create-user.dto";



export class CreateUserController extends BaseController<CreateUserDTOEnd> {

  constructor(
    private useCase: CreateUserUseCase
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
      return this.okBuild();
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}