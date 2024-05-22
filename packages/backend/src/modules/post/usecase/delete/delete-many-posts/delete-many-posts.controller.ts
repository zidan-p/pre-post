import { BaseController } from "~/common/core/controller.base";
import { DeleteManyPostsUseCase } from "./delete-many-posts.use-case";
import { DeleteManyPostsBody } from "./delete-many-posts.dto";
import { DeleteManyPostsUseCaseErrors } from "./delete-many-posts.error";



export class DeleteManyPostsController extends BaseController {

  private useCase: DeleteManyPostsUseCase;
  
  constructor(useCase: DeleteManyPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    const user = this.getUser();
    if(!user) return this.unauthorized("no authorized user found");

    const body = this.getBody() as DeleteManyPostsBody;
    try {
      const result = await this.useCase.execute({body, user});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case exception instanceof DeleteManyPostsUseCaseErrors.FailBuilUser:
            return this.fail(exception.message);

          case exception instanceof DeleteManyPostsUseCaseErrors.ForbiddenAccess:
            return this.forbidden(exception.message);

          case exception instanceof DeleteManyPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message);

          case exception instanceof DeleteManyPostsUseCaseErrors.SomePostNotFound:
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