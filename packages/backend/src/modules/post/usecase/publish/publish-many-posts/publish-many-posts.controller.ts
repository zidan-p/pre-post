import { BaseController } from "~/common/core/controller.base";
import { PublishManyPostsUseCase } from "./publish-many-posts.use-case";
import { PublishManyPostsBody, PublishManyPostsQuery } from "./publish-many-posts.dto";
import { PublishManyPostsUseCaseErrors } from "./publish-many-posts.error";



export class PublishManyPostsController extends BaseController {

  private useCase: PublishManyPostsUseCase;
  
  constructor(useCase: PublishManyPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    // const body = this.getBody() as PublishManyPostsBody;
    const query = this.getQueryData() as PublishManyPostsQuery;
    try {
      const result = await this.useCase.execute({query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error  instanceof PublishManyPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message, exception);
            break
          case error  instanceof PublishManyPostsUseCaseErrors.SomePostNotFound:
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