import { BaseController } from "~/common/core/controller.base";
import { Post } from "../../../domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";
import { GetAllPostUseCase } from "./get-all-post.use-case";
import { GetAllPostBody, GetAllPostQuery } from "./get-all-post.dto";
import { GetAllPostUseCaseErrors } from "./get-all-post.error";
import { GetAllPostResponse } from "./get-all-post.response";



export class GetAllPostController<TPostRaw extends Record<string, any> = Record<string, any>> extends BaseController {

  private useCase: GetAllPostUseCase;
  
  constructor(
    useCase: GetAllPostUseCase, 
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    
    const payloadBody = this.getBody() as GetAllPostBody;
    const payloadQuery = this.getQueryData() as GetAllPostQuery;

    try {
      const result = await this.useCase.execute({query: payloadQuery}) as GetAllPostResponse;
      
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