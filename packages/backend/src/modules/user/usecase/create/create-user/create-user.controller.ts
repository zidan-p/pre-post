import { BaseController } from "~/common/core/controller.base";
import { CreateUserUseCase } from "./create-user.use-case";
import { CreateUserBody, CreateUserDTOEnd } from "./create-user.dto";



export class CreateUserController extends BaseController<CreateUserDTOEnd> {

  constructor(
    private useCase: CreateUserUseCase
  ){
    super();
  }


  async executeImpl(){
    const body = this.getBody() as CreateUserBody;
    try {
      const result = await this.useCase.execute({body});
      
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