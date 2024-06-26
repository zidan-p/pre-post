import { BaseController } from "~/common/core/controller.base";
import { UpdateManyUserUseCase } from "./update-many-user.use-case";
import { UpdateManyUserDTOEnd } from "./update-many-user.dto";



export class UpdateManyUserController extends BaseController<UpdateManyUserDTOEnd> {

  constructor(
    private useCase: UpdateManyUserUseCase
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