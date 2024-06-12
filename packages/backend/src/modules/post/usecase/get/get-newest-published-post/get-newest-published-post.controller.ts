import { BaseController } from "~/common/core/controller.base";
import { GetNewestPublishedPostUseCase } from "./get-newest-published-post.use-case";
import { GetNewestPublishedPostDTOEnd, GetNewestPublishedPostQuery } from "./get-newest-published-post.dto";
import { IPresenterMapper } from "~/common/core/mapper";
import { Post } from "~/modules/post/domain/post.agregate-root";



export class GetNewestPublishedPostController<TPostRaw> extends BaseController<GetNewestPublishedPostDTOEnd<TPostRaw>> {

  constructor(
    private useCase: GetNewestPublishedPostUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
  }


  async executeImpl(){
    const query = this.getQueryData() as GetNewestPublishedPostQuery;
    try {
      const result = await this.useCase.execute({query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const data = result.value.getValue();
      const postPreseter = data.posts.map(post => this.postMapper.toPresentation(post));
      const paginate = data.paginate;
      // return this.ok({paginate, posts: postPreseter});
      return this.okBuild({data: postPreseter, pagination: paginate})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}