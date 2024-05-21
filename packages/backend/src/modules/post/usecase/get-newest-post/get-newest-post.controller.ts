import { BaseController } from "~/common/core/controller.base";
import { GetNewestPostUseCase } from "./get-newest-post.use-case";
import { Post } from "../../domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";
import { GetNewestPostQuery } from "./get-newest-post.dto";



export class GetNewestPostController<TPostRaw extends Record<string, any> = Record<string, any>> extends BaseController {

  private useCase: GetNewestPostUseCase;
  
  constructor(
    useCase: GetNewestPostUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const query = this.getQueryData() as GetNewestPostQuery;
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

      return this.ok({posts: postPreseter, paginate});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}