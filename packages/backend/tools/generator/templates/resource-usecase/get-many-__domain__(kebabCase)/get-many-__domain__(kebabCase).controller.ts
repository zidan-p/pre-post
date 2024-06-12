import { BaseController } from "~/common/core/controller.base";
import { GetMany__domain__PascalCase__UseCase } from "./get-many-__domain__(kebabCase).use-case";
import { GetMany__domain__PascalCase__DTOEnd } from "./get-many-__domain__(kebabCase).dto";



export class GetMany__domain__PascalCase__Controller extends BaseController<GetMany__domain__PascalCase__DTOEnd> {

  constructor(
    private useCase: GetMany__domain__PascalCase__UseCase
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