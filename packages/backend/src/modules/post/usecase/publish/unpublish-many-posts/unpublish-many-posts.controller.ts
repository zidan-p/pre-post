import { BaseController } from "~/common/core/controller.base";
import { UnpublishManyPostsUseCase } from "./unpublish-many-posts.use-case";
import { UnpublishManyPostsUseCaseErrors } from "./unpublish-many-posts.error";
import { UnpublishManyPostsBody, UnpublishManyPostsQuery } from "./unpublish-many-posts.dto";



export class UnpublishManyPostsController extends BaseController {

  private useCase: UnpublishManyPostsUseCase;
  
  constructor(useCase: UnpublishManyPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    // const body = this.getBody() as UnpublishManyPostsBody;
    const query = this.getQueryData() as UnpublishManyPostsQuery;
    try {
      const result = await this.useCase.execute({query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error  instanceof UnpublishManyPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message, exception);
            break
          case error instanceof UnpublishManyPostsUseCaseErrors.InvalidPostIdValue:
            return this.clientError(exception.message, exception?.metadata as Record<string, any>);
            break
          case error  instanceof UnpublishManyPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
            break
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      return this.ok(result?.value?.getValue()?.postIds?.map(i => i.getStringValue()), "Success unpublish multiple post");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}