import { BaseController } from "~/common/core/controller.base";
import { GetPublishedPostByOwnerUseCase } from "./get-published-post-by-owner.use-case";
import { GetPublishedPostByOwnerDTOEnd, GetPublishedPostByOwnerParams, GetPublishedPostByOwnerQuery } from "./get-published-post-by-owner.dto";
import { GetPublishedPostByOwnerUseCaseErrors } from "./get-published-post-by-owner.error";
import { IPresenterMapper } from "~/common/core/mapper";
import { Post } from "~/modules/post/domain/post.agregate-root";



export class GetPublishedPostByOwnerController<TPostRaw extends Record<string, any>> extends BaseController<GetPublishedPostByOwnerDTOEnd<TPostRaw>> {

  
  constructor(
    private useCase: GetPublishedPostByOwnerUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
  }


  async executeImpl(){

    const param = this.getParams() as unknown as GetPublishedPostByOwnerParams;
    const query = this.getQueryData() as GetPublishedPostByOwnerQuery;
    
    try {
      const result = await this.useCase.execute({param, query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case exception instanceof GetPublishedPostByOwnerUseCaseErrors.OwnerNotFound:
            this.notFound(exception.message, exception.metadata as Record<string, any>);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const value = result.value.getValue();
      const posts = value.posts;
      const postPresenter = posts.map(post => this.postMapper.toPresentation(post));
      const paginate = value.paginate;
      return this.ok({posts: postPresenter, paginate});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}