import { BaseController } from "~/common/core/controller.base";
import { DeleteOwnedPostUseCase } from "./delete-owned-post.use-case";
import { DeleteOwnedPostDTOEnd, DeleteOwnedPostParams } from "./delete-owned-post.dto";
import { DeleteOwnedPostUseCaseErrors } from "./delete-owned-post.error";



export class DeleteOwnedPostController extends BaseController<DeleteOwnedPostDTOEnd> {

  constructor(
    private useCase: DeleteOwnedPostUseCase
  ){
    super();
  }


  async executeImpl(){
    const param = this.getParams() as unknown as DeleteOwnedPostParams;
    const user = this.getUser();

    if(!user) return this.unauthorized("Not Authorized to aceess this resource");
    try {
      const result = await this.useCase.execute({user,param});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error  instanceof DeleteOwnedPostUseCaseErrors.ForbiddenUser:
            this.forbidden(exception.message, exception?.metadata as Record<string, any>)
            break;
          case error  instanceof DeleteOwnedPostUseCaseErrors.PostNotFound:
            this.notFound(exception.message, exception?.metadata as Record<string, any>)
            break;
          case error  instanceof DeleteOwnedPostUseCaseErrors.UserNotFound:
            this.unauthorized(exception.message, exception?.metadata as Record<string, any>)
            break;
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