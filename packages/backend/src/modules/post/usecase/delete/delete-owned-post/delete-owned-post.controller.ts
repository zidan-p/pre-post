import { BaseController } from "~/common/core/controller.base";
import { DeleteOwnedPostUseCase } from "./delete-owned-post.use-case";
import { DeleteOwnedPostDTOEnd, DeleteOwnedPostParams } from "./delete-owned-post.dto";
import { DeleteOwnedPostUseCaseErrors } from "./delete-owned-post.error";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class DeleteOwnedPostController extends BaseController<DeleteOwnedPostDTOEnd> {

  constructor(
    private useCase: DeleteOwnedPostUseCase,
    private readonly postMapper: IPresenterMapper<Post, any>,
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
            return this.forbidden(exception.message, exception?.metadata as Record<string, any>)
          case error  instanceof DeleteOwnedPostUseCaseErrors.PostNotFound:
            return this.notFound(exception.message, exception?.metadata as Record<string, any>)
          case error  instanceof DeleteOwnedPostUseCaseErrors.UserNotFound:
            return this.unauthorized(exception.message, exception?.metadata as Record<string, any>)
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const dto = result.value;
      const postsPresenter = this.postMapper.toPresentation(dto.getValue().post);
      return this.okBuild({data: postsPresenter})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}