import { BaseController } from "~/common/core/controller.base";
import { DeletePostUseCase } from "./delete-post.use-case";
import { DeletePostDTORequest, DeletePostParam } from "./delete-post.dto";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class DeletePostController extends BaseController {

  private useCase: DeletePostUseCase;
  
  constructor(
    useCase: DeletePostUseCase,
    private readonly postMapper: IPresenterMapper<Post, any>,
  ){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const param = this.getParams() as unknown as DeletePostParam;

    if(!param) return this.clientError("Invalid Param value");

    try {
      const result = await this.useCase.execute({param});
      
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
      const postsPresenter = this.postMapper.toPresentation(dto.getValue().post);
      return this.okBuild({data: postsPresenter})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}