import { BaseController } from "~/common/core/controller.base";
import { UnpublishManyPostsUseCase } from "./unpublish-many-posts.use-case";
import { UnpublishManyPostsUseCaseErrors } from "./unpublish-many-posts.error";
import { UnpublishManyPostsBody } from "./unpublish-many-posts.dto";



export class UnpublishManyPostsController extends BaseController {

  private useCase: UnpublishManyPostsUseCase;
  
  constructor(useCase: UnpublishManyPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    const body = this.getBody() as UnpublishManyPostsBody;
    try {
      const result = await this.useCase.execute({body});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case exception instanceof UnpublishManyPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message, exception);
            break
          case exception instanceof UnpublishManyPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
            break
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      return this.ok(null, "Success unpublish multiple post");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}