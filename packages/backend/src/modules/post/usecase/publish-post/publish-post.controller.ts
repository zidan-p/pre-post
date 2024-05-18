import { BaseController } from "~/common/core/controller.base";
import { PublishPostUseCase } from "./publish-post.use-case";
import { PublishPostParams } from "./publish-post.dto";



export class PublishPostController extends BaseController {

  private useCase: PublishPostUseCase;
  
  constructor(useCase: PublishPostUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const params = this.getParams() as unknown as PublishPostParams;
    const user = this.getUser();

    if(!user) return this.forbidden("undefiend user can't access this resource");

    try {
      const result = await this.useCase.execute({params, user});
      
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