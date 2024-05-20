import { BaseController } from "~/common/core/controller.base";
import { UnpublishPostUseCase } from "./unpublish-post.use-case";
import { UnpublishPostParams } from "./unpublish-post.dto";
import { UnpublishPostUseCaseErrors } from "./unpublish-post.error";
import { Post } from "../../domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class UnpublishPostController<TPostRaw extends Record<string, any> = Record<string, any>> extends BaseController {

  private useCase: UnpublishPostUseCase;
  
  constructor(
    useCase: UnpublishPostUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    const params = this.getParams() as unknown as UnpublishPostParams;
    const user = this.getUser();

    if(!user) return this.forbidden("undefiend user can't access this resource");

    try {
      const result = await this.useCase.execute({user,params});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case exception instanceof UnpublishPostUseCaseErrors.PostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>)

          case exception instanceof UnpublishPostUseCaseErrors.ForbiddenUser:
            return this.notFound(exception.message);

          case exception instanceof UnpublishPostUseCaseErrors.NotFoundUser:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);

          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const value = result.value.getValue();
      const post = this.postMapper.toPresentation(value.post);
      return this.ok({post});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}