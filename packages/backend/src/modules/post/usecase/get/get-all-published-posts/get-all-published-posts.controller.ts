import { BaseController } from "~/common/core/controller.base";
import { GetAllPublishedPostsUseCase } from "./get-all-published-posts.use-case";
import { GetAllPublishedPostsDTOEnd, GetAllPublishedPostsQuery } from "./get-all-published-posts.dto";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { IGeneralPresenterMapper, IPresenterMapper } from "~/common/core/mapper";
import { IPaginateReponse } from "~/common/types/paginate";



export class GetAllPublishedPostsController<TPostRaw, TPaginateRaw = any> extends BaseController<GetAllPublishedPostsDTOEnd<TPostRaw>> {

  constructor(
    private useCase: GetAllPublishedPostsUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>,
    private readonly pageMapper: IGeneralPresenterMapper<IPaginateReponse, TPaginateRaw>
  ){
    super();
  }


  async executeImpl(){
    const payloadQuery = this.getQueryData() as GetAllPublishedPostsQuery;

    try {
      const result = await this.useCase.execute({query: payloadQuery});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const dto = result.value;
      const posts = dto.getValue().posts;
      const postsRaw = posts.map(post => this.postMapper.toPresentation(post));
      const paginate = this.pageMapper.toPresentation(dto.getValue().paginate);;
      // return this.ok({posts: postsRaw, paginate});
      return this.okBuild({data: postsRaw, pagination: paginate})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}