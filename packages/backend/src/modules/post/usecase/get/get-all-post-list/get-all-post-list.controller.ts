import { BaseController } from "~/common/core/controller.base";
import { GetAllPostListUseCase } from "./get-all-post-list.use-case";
import { GetAllPostListDTOEnd, GetAllPostListQuery } from "./get-all-post-list.dto";
import { GetAllPostListUseCaseErrors } from "./get-all-post-list.error";
import { IGeneralPresenterMapper, IPresenterMapper } from "~/common/core/mapper";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { IPaginate, IPaginateReponse } from "~/common/types/paginate";



export class GetAllPostListController<TPostRaw = any, TPaginateRaw = any> extends BaseController<GetAllPostListDTOEnd> {

  constructor(
    private useCase: GetAllPostListUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>,
    private readonly pageMapper: IGeneralPresenterMapper<IPaginate, TPaginateRaw>
  ){
    super();
  }


  async executeImpl(){

    const query = this.getQueryData() as GetAllPostListQuery;
    try {
      const result = await this.useCase.execute({query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case exception instanceof GetAllPostListUseCaseErrors.FailBuildingPost:
            return this.fail(exception.message);
          case exception instanceof GetAllPostListUseCaseErrors.InvalidProperties:
            return this.clientError(exception.message, exception?.metadata as Record<string, any>);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const value = result.value.getValue();

      const posts = value.posts.map(post => this.postMapper.toPresentation(post));
      const paginate = this.pageMapper.toPresentation(value.paginate);

      return this.ok({paginate, posts}, "Success get all post listsentenceCase__");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}