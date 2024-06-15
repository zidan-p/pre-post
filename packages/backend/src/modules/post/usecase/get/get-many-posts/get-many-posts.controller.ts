import { BaseController } from "~/common/core/controller.base";
import { GetManyPostsUseCase } from "./get-many-posts.use-case";
import { GetManyPostsBody, GetManyPostsDTOEnd, GetManyPostsParams, GetManyPostsQuery } from "./get-many-posts.dto";
import { GetManyPostsUseCaseErrors } from "./get-many-posts.error";
import { IPresenterMapper } from "~/common/core/mapper";
import { Post } from "~/modules/post/domain/post.agregate-root";



export class GetManyPostsController<TPostPresenter = any> extends BaseController<GetManyPostsDTOEnd> {

  constructor(
    private useCase: GetManyPostsUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostPresenter>
  ){
    super();
  }


  async executeImpl(){

    // const body = this.getBody() as GetManyPostsBody;;
    const query = this.getQueryData() as GetManyPostsQuery | undefined;
    try {
      const result = await this.useCase.execute({query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){

          case error  instanceof GetManyPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message);

          case error  instanceof GetManyPostsUseCaseErrors.IssueWhenBuilding:
            return this.clientError(exception.message);

          case error  instanceof GetManyPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const postsValue = result.value.getValue().posts;
      const posts = postsValue.map(post => this.postMapper.toPresentation(post));
      // return this.ok({posts}, "Success Get many posts");
      return this.okBuild({data: posts})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}