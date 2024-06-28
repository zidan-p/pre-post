import { BaseController } from "~/common/core/controller.base";
import { UpdateManyUserUseCase } from "./update-many-user.use-case";
import { UpdateManyUserBody, UpdateManyUserDTOEnd, UpdateManyUserQuery } from "./update-many-user.dto";
import { UpdateManyUserUseCaseErrors } from "./update-many-user.error";



export class UpdateManyUserController extends BaseController<UpdateManyUserDTOEnd> {

  constructor(
    private useCase: UpdateManyUserUseCase
  ){
    super();
  }


  async executeImpl(){
    const body = this.getBody() as UpdateManyUserBody;
    const query = this.getQueryData() as UpdateManyUserQuery;
    try {
      const result = await this.useCase.execute({body, query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof UpdateManyUserUseCaseErrors.InvalidUserIdValue:
          case error instanceof UpdateManyUserUseCaseErrors.InvalidUserIdValue:
            return this.clientError(exception.message, exception.metadata as Record<string, any>);
          case error instanceof UpdateManyUserUseCaseErrors.SomeUserNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
          case error instanceof UpdateManyUserUseCaseErrors.InvalidOperation:
          case error instanceof UpdateManyUserUseCaseErrors.IssueWhenBuilding:
            return this.fail(exception.message, exception);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const affectedRecord = result.value.getValue().affectedRecord;
      return this.okBuild({data: {affectedRecord}});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}