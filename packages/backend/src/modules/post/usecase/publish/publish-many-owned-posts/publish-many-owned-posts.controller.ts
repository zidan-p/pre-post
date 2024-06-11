import { BaseController } from "~/common/core/controller.base";
import { PublishManyOwnedPostsUseCase } from "./publish-many-owned-posts.use-case";
import { PublishManyOwnedPostsUseCaseErrors } from "./publish-many-owned-posts.error";
import { PublishManyOwnedPostsBody } from "./publish-many-owned-posts.dto";



export class PublishManyOwnedPostsController extends BaseController {

  private useCase: PublishManyOwnedPostsUseCase;
  
  constructor(useCase: PublishManyOwnedPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const body = this.getBody() as PublishManyOwnedPostsBody;
    const user = this.getUser();

    if(!user) return this.unauthorized("User not defined to perform this action");

    try {
      const result = await this.useCase.execute({body, user});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error  instanceof PublishManyOwnedPostsUseCaseErrors.FailBuilUser:
            return this.fail(exception.message, exception);
            break
          case error  instanceof PublishManyOwnedPostsUseCaseErrors.ForbiddenAccess:
            return this.forbidden(exception.message, exception.metadata as Record<string, any>);
            break
          case error  instanceof PublishManyOwnedPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message, exception);
            break
          case error  instanceof PublishManyOwnedPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
            break
          case error  instanceof PublishManyOwnedPostsUseCaseErrors.UserNotFound:
            return this.forbidden(exception.message, exception.metadata as Record<string, any>);
            break
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      return this.ok(null, "Success Publish owned Post Controller");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}