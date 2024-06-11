import { BaseController } from "~/common/core/controller.base";
import { GetPostsByCurrentUserUseCase } from "./get-posts-by-current-user.use-case";
import { GetPostsByCurrentUserUseCaseErrors } from "./get-posts-by-current-user.error";
import { GetPostsByCurrentUserQuery } from "./get-posts-by-current-user.dto";
import { IPresenterMapper } from "~/common/core/mapper";
import { Post } from "../../../domain/post.agregate-root";



export class GetPostsByCurrentUserController<TPostRaw extends Record<string, any> = Record<string, any>> extends BaseController {

  private useCase: GetPostsByCurrentUserUseCase;
  
  constructor(
    useCase: GetPostsByCurrentUserUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const user = this.getUser();
    console.log(user);
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
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const value = result.value.getValue();
      const posts = value.posts;
      const postsRaw = posts.map(post => this.postMapper.toPresentation(post));
      const paginate = value.paginate;
      return this.ok({posts: postsRaw, paginate});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}