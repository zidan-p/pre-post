import { BaseController } from "~/common/core/controller.base";
import { GetList__domain__PascalCase__UseCase } from "./get-list-__domain__(kebabCase).use-case";
import { GetList__domain__PascalCase__DTOEnd } from "./get-list-__domain__(kebabCase).dto";



export class GetList__domain__PascalCase__Controller extends BaseController<GetList__domain__PascalCase__DTOEnd> {

  constructor(
    private useCase: GetList__domain__PascalCase__UseCase
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
      return this.ok(null, "Success __domain__SentenceCase__");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}