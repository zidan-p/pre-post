import { BaseController } from "~/common/core/controller.base";
import { Post } from "../../domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";
import { GetAllPostUseCase } from "./delete-post.use-case";
import { GetAllPostBody, GetAllPostQuery } from "./delete-post.dto";



export class GetAllPostController extends BaseController {

  private useCase: GetAllPostUseCase;
  
  constructor(useCase: GetAllPostUseCase, private readonly postMapper: IPresenterMapper<Post, any>){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    
    const payloadBody = this.getBody() as GetAllPostBody;
    const payloadQuery = this.getQueryData() as GetAllPostQuery;

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
      const paginate = dto.getValue().paginate;
      return this.ok({posts: postsRaw, paginate});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}