import { BaseController } from "~/common/core/controller.base";
import { Get__usecase__PascalCase__UseCase } from "./get-__usecase__(kebabCase).use-case";
import { Get__usecase__PascalCase__DTOEnd } from "./get-__usecase__(kebabCase).dto";



export class Get__usecase__PascalCase__Controller extends BaseController<Get__usecase__PascalCase__DTOEnd> {

  constructor(
    private useCase: Get__usecase__PascalCase__UseCase
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
      return this.ok(null, "Success __usecase__sentenceCase__");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}