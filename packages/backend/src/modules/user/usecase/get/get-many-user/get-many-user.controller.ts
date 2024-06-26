import { BaseController } from "~/common/core/controller.base";
import { GetManyUserUseCase } from "./get-many-user.use-case";
import { GetManyUserDTOEnd } from "./get-many-user.dto";



export class GetManyUserController extends BaseController<GetManyUserDTOEnd> {

  constructor(
    private useCase: GetManyUserUseCase
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