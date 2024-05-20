import { BaseController } from "~/common/core/controller.base";
import { PublishPostUseCase } from "./publish-post.use-case";
import { PublishPostParams } from "./publish-post.dto";
import { PublishPostUseCaseErrors } from "./publish-post.error";
import { Post } from "../../domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class PublishPostController<TPostRaw extends Record<string, any> = Record<string, any>> extends BaseController {

  private useCase: PublishPostUseCase;
  
  constructor(
    useCase: PublishPostUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>
  ){
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

          case exception instanceof PublishPostUseCaseErrors.PostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>)

          case exception instanceof PublishPostUseCaseErrors.ForbiddenUser:
            return this.notFound(exception.message);

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