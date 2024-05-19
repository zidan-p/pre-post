import { BaseController } from "~/common/core/controller.base";
import { GetPostsByCurrentUserUseCase } from "./get-posts-by-current-user.use-case";
import { GetPostsByCurrentUserUseCaseErrors } from "./get-posts-by-current-user.error";
import { GetPostsByCurrentUserQuery } from "./get-posts-by-current-user.dto";



export class GetPostsByCurrentUserController extends BaseController {

  private useCase: GetPostsByCurrentUserUseCase;
  
  constructor(useCase: GetPostsByCurrentUserUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const user = this.getUser();
    if(!user) return this.forbidden("No auth user to get post");

    const query = this.getQueryData() as GetPostsByCurrentUserQuery;

    try {
      const result = await this.useCase.execute({user, query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){

          case exception instanceof GetPostsByCurrentUserUseCaseErrors.PostNotFound:
            return this.notFound(exception.message);
          
          case exception instanceof GetPostsByCurrentUserUseCaseErrors.UserNotFound:
            return this.forbidden(exception.message, exception.metadata as Record<any, any>);

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