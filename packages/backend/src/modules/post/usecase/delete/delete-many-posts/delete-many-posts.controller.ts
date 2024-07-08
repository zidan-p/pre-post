import { BaseController } from "~/common/core/controller.base";
import { DeleteManyPostsUseCase } from "./delete-many-posts.use-case";
import { DeleteManyPostsBody, DeleteManyPostsQuery } from "./delete-many-posts.dto";
import { DeleteManyPostsUseCaseErrors } from "./delete-many-posts.error";



export class DeleteManyPostsController extends BaseController {

  private useCase: DeleteManyPostsUseCase;
  
  constructor(useCase: DeleteManyPostsUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){

    const query = this.getQueryData() as DeleteManyPostsQuery;
    try {
      const result = await this.useCase.execute({query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error  instanceof DeleteManyPostsUseCaseErrors.FailBuilUser:
            return this.fail(exception.message);

          case error  instanceof DeleteManyPostsUseCaseErrors.ForbiddenAccess:
            return this.forbidden(exception.message);

          case error  instanceof DeleteManyPostsUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message);

          case error  instanceof DeleteManyPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message);


          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
        }
      }
      const postIds = result.value.getValue().postIds;

      return this.okBuild({data:postIds})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}