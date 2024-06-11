import { BaseController } from "~/common/core/controller.base";
import { UnpublishManyOwnedPostsUseCase } from "./unpublish-many-owned-posts.use-case";
import { UnpublishManyOwnedPostsBody } from "./unpublish-many-owned-posts.dto";
import { UnpublishManyOwnedPostsUseCaseErrors } from "./unpublish-many-owned-posts.error";
import { PostOwnershipServiceErrors } from "~/modules/post/domain/service/post-ownership.service";



export class UnpublishManyOwnedPostsController extends BaseController {

  private useCase: UnpublishManyOwnedPostsUseCase;
  
  constructor(useCase: UnpublishManyOwnedPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    const body = this.getBody() as UnpublishManyOwnedPostsBody;
    const user = this.getUser();

    if(!user) return this.unauthorized("can't access this resource");
    try {
      const result = await this.useCase.execute({body, user});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error  instanceof UnpublishManyOwnedPostsUseCaseErrors.FailBuilUser:
            return this.fail(exception.message, exception)
            break
          case error  instanceof UnpublishManyOwnedPostsUseCaseErrors.ForbiddenAccess:
            return this.forbidden(exception.message, exception.metadata as Record<string, any>)
            break
          case error  instanceof UnpublishManyOwnedPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message, exception)
            break
          case error  instanceof UnpublishManyOwnedPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>)
            break
          case error  instanceof UnpublishManyOwnedPostsUseCaseErrors.UserNotFound:
            return this.forbidden(exception.message, exception.metadata as Record<string, any>)
            break
          case error  instanceof PostOwnershipServiceErrors.NotOwnedByUser:
            return this.unauthorized(exception.message, exception.metadata as Record<string, any>)
            break
          case error  instanceof PostOwnershipServiceErrors.SomePostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>)
            break
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      return this.ok(null, "Success unpublish post");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}