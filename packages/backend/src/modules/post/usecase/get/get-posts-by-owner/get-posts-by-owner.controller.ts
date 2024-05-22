import { BaseController } from "~/common/core/controller.base";
import { GetPostsByOwnerUseCase } from "./get-posts-by-owner.use-case";
import { GetPostsByOwnerParams, GetPostsByOwnerQuery } from "./get-posts-by-owner.dto";
import { GetPostsByOwnerUseCaseErrors } from "./get-posts-by-owner.error";
import { Post } from "../../../domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class GetPostsByOwnerController<TPostRaw extends Record<string, any> = Record<string, any>> extends BaseController {

  private useCase: GetPostsByOwnerUseCase;
  
  constructor(
    useCase: GetPostsByOwnerUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const param = this.getParams() as unknown as GetPostsByOwnerParams;
    const query = this.getQueryData() as GetPostsByOwnerQuery;
    
    try {
      const result = await this.useCase.execute({param, query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case exception instanceof GetPostsByOwnerUseCaseErrors.OwnerNotFound:
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
      return this.ok({posts : postPresenter, paginate});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}