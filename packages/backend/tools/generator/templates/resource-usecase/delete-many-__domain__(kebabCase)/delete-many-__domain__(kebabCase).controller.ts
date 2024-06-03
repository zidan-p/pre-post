import { BaseController } from "~/common/core/controller.base";
import { DeleteMany__domain__PascalCase__UseCase } from "./delete-many-__domain__(kebabCase).use-case";
import { DeleteMany__domain__PascalCase__DTOEnd } from "./delete-many-__domain__(kebabCase).dto";



export class DeleteMany__domain__PascalCase__Controller extends BaseController<DeleteMany__domain__PascalCase__DTOEnd> {

  constructor(
    private useCase: DeleteMany__domain__PascalCase__UseCase
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