import { BaseController } from "~/common/core/controller.base";
import { __usecase__PascalCase__UseCase } from "./__usecase__(kebabCase).use-case";



export class __usecase__PascalCase__Controller extends BaseController {

  private useCase: __usecase__PascalCase__UseCase;
  
  constructor(useCase: __usecase__PascalCase__UseCase){
    super();
    this.useCase = useCase;
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
      return this.ok();
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}