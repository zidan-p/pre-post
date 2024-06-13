import { BaseController } from "~/common/core/controller.base";
import { GetPostsByCurrentUserUseCase } from "./get-posts-by-current-user.use-case";
import { GetPostsByCurrentUserUseCaseErrors } from "./get-posts-by-current-user.error";
import { GetPostsByCurrentUserQuery } from "./get-posts-by-current-user.dto";
import { IGeneralPresenterMapper, IPresenterMapper } from "~/common/core/mapper";
import { Post } from "../../../domain/post.agregate-root";
import { IPaginateReponse } from "~/common/types/paginate";



export class GetPostsByCurrentUserController<TPostRaw extends Record<string, any> = Record<string, any>, TPaginate = any> extends BaseController {

  private useCase: GetPostsByCurrentUserUseCase;
  
  constructor(
    useCase: GetPostsByCurrentUserUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>,
    private readonly postPaginateMapper: IGeneralPresenterMapper<IPaginateReponse, TPaginate>
  ){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const user = this.getUser();
    if(!user) return this.forbidden("No auth user to get post");

    const query = this.getQueryData() as GetPostsByCurrentUserQuery;

    try {
      const result = await this.useCase.execute({user, query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){

          case error  instanceof GetPostsByCurrentUserUseCaseErrors.PostNotFound:
            return this.notFound(exception.message);
          
          case error  instanceof GetPostsByCurrentUserUseCaseErrors.UserNotFound:
            return this.forbidden(exception.message, exception.metadata as Record<any, any>);

          default:
            console.error(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const value = result.value.getValue();
      const posts = value.posts;
      const postsRaw = posts.map(post => this.postMapper.toPresentation(post));
      const paginate = this.postPaginateMapper.toPresentation(value.paginate);
      // return this.ok({posts: postsRaw, paginate});
      return this.okBuild({data: postsRaw, pagination: paginate})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}