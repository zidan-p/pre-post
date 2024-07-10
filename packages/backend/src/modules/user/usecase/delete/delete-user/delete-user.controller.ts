import { BaseController } from "~/common/core/controller.base";
import { DeleteUserUseCase } from "./delete-user.use-case";
import { DeleteUserDTOEnd } from "./delete-user.dto";
import { DeleteUserUseCaseErrors } from "./delete-user.error";
import { User } from "~/modules/user/domain/user.agreegate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class DeleteUserController<TUserRaw = any>  extends BaseController<DeleteUserDTOEnd> {

  constructor(
    private useCase: DeleteUserUseCase,
    private readonly userMapper: IPresenterMapper<User, Promise<TUserRaw>>,
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
      const user = await this.userMapper.toPresentation(result.value.getValue().user);
      return this.okBuild({data: user});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}