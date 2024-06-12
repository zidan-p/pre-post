import { BaseController } from "~/common/core/controller.base";
import { CreateMany__domain__PascalCase__UseCase } from "./create-many-__domain__(kebabCase).use-case";
import { CreateMany__domain__PascalCase__DTOEnd } from "./create-many-__domain__(kebabCase).dto";



export class CreateMany__domain__PascalCase__Controller extends BaseController<CreateMany__domain__PascalCase__DTOEnd> {

  constructor(
    private useCase: CreateMany__domain__PascalCase__UseCase
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
      // return this.ok(null, "Success __domain__sentenceCase__");
      return this.okBuild()
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}