import { BaseController } from "~/common/core/controller.base";
import { PublishManyPostsUseCase } from "./publish-many-posts.use-case";
import { PublishManyPostsBody } from "./publish-many-posts.dto";
import { PublishManyPostsUseCaseErrors } from "./publish-many-posts.error";



export class PublishManyPostsController extends BaseController {

  private useCase: PublishManyPostsUseCase;
  
  constructor(useCase: PublishManyPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const body = this.getBody() as PublishManyPostsBody;
    try {
      const result = await this.useCase.execute({body});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case exception instanceof PublishManyPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message, exception);
            break
          case exception instanceof PublishManyPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
            break
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      return this.ok(null, "Success publish many posts");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}