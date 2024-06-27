import { BaseController } from "~/common/core/controller.base";
import { DeleteUserUseCase } from "./delete-user.use-case";
import { DeleteUserDTOEnd } from "./delete-user.dto";
import { DeleteUserUseCaseErrors } from "./delete-user.error";



export class DeleteUserController extends BaseController<DeleteUserDTOEnd> {

  constructor(
    private useCase: DeleteUserUseCase
  ){
    super();
  }


  async executeImpl(){

    try {
      const result = await this.useCase.execute({});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof DeleteUserUseCaseErrors.InvalidUserIdValue:
            return this.clientError(exception.message, exception?.metadata as Record<string, any>);
          case error instanceof DeleteUserUseCaseErrors.UserNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      return this.okEmpty()
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}