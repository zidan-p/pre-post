import { BaseController } from "~/common/core/controller.base";
import { Delete__domain__PascalCase__UseCase } from "./delete-__domain__(kebabCase).use-case";
import { Delete__domain__PascalCase__DTOEnd } from "./delete-__domain__(kebabCase).dto";



export class Delete__domain__PascalCase__Controller extends BaseController<Delete__domain__PascalCase__DTOEnd> {

  constructor(
    private useCase: Delete__domain__PascalCase__UseCase
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
      return this.ok(null, "Success __domain__sentenceCase__");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}