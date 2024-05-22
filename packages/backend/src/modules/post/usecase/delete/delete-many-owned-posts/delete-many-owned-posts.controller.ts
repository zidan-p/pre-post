import { BaseController } from "~/common/core/controller.base";
import { DeleteManyOwnedPostsUseCase } from "./delete-many-owned-posts.use-case";
import { DeleteManyOwnedPostsBody } from "./delete-many-owned-posts.dto";
import { DeleteManyOwnedPostsUseCaseErrors } from "./delete-many-owned-posts.error";



export class DeleteManyOwnedPostsController extends BaseController {

  private useCase: DeleteManyOwnedPostsUseCase;
  
  constructor(useCase: DeleteManyOwnedPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    const user = this.getUser();
    if(!user) return this.unauthorized("no authorized user found");

    const body = this.getBody() as DeleteManyOwnedPostsBody;
    try {
      const result = await this.useCase.execute({body, user});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case exception instanceof DeleteManyOwnedPostsUseCaseErrors.FailBuilUser:
            return this.fail(exception.message);

          case exception instanceof DeleteManyOwnedPostsUseCaseErrors.ForbiddenAccess:
            return this.forbidden(exception.message);

          case exception instanceof DeleteManyOwnedPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message);

          case exception instanceof DeleteManyOwnedPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message);


          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
        }
      }
      const affectedRecord = result.value.getValue().affectedRecord;

      return this.ok({affectedRecord});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}