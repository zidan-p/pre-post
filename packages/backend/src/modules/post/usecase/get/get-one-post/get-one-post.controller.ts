import { BaseController } from "~/common/core/controller.base";
import { GetOnePostUseCase } from "./get-one-post.use-case";
import { GetOnePostDTOEnd } from "./get-one-post.dto";
import { GetOnePostUseCaseErrors } from "./get-one-post.error";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class GetOnePostController<TPostRaw = any> extends BaseController<GetOnePostDTOEnd> {

  constructor(
    private useCase: GetOnePostUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>,
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
          case error instanceof GetOnePostUseCaseErrors.InvalidId:
            return this.clientError(exception.message, exception.metadata as Record<string, any>);
          case error instanceof GetOnePostUseCaseErrors.PostNotFound:
          case error instanceof GetOnePostUseCaseErrors.UserNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const post = this.postMapper.toPresentation(result.value.getValue().post);
      return this.okBuild({data: post})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}