import { BaseController } from "~/common/core/controller.base";
import { Update__domain__PascalCase__UseCase } from "./update-__domain__(kebabCase).use-case";
import { Update__domain__PascalCase__DTOEnd } from "./update-__domain__(kebabCase).dto";



export class Update__domain__PascalCase__Controller extends BaseController<Update__domain__PascalCase__DTOEnd> {

  constructor(
    private useCase: Update__domain__PascalCase__UseCase
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