import { BaseController } from "~/common/core/controller.base";
import { DeleteManyUserUseCase } from "./delete-many-user.use-case";
import { DeleteManyUserDTOEnd, DeleteManyUserQuery } from "./delete-many-user.dto";
import { DeleteManyUserUseCaseErrors } from "./delete-many-user.error";



export class DeleteManyUserController extends BaseController<DeleteManyUserDTOEnd> {

  constructor(
    private useCase: DeleteManyUserUseCase
  ){
    super();
  }


  async executeImpl(){
    const query = this.getQueryData() as DeleteManyUserQuery;
    try {
      const result = await this.useCase.execute({query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof DeleteManyUserUseCaseErrors.InvalidUserIdValue:
            return this.clientError(exception.message, exception?.metadata as Record<string, any>);
          case error instanceof DeleteManyUserUseCaseErrors.SomeUserNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
          case error instanceof DeleteManyUserUseCaseErrors.IssueWhenBuilding:
          case error instanceof DeleteManyUserUseCaseErrors.DeleteOperationFailed:
            return this.fail(exception.message);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const userIds = result.value.getValue().userIds;
      return this.okBuild({data: userIds});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}