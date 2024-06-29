import { BaseController } from "~/common/core/controller.base";
import { UpdateUserUseCase } from "./update-user.use-case";
import { UpdateUserBody, UpdateUserDTOEnd, UpdateUserParams } from "./update-user.dto";
import { UpdateUserUseCaseErrors } from "./update-user.error";
import { User } from "~/modules/user/domain/user.agreegate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class UpdateUserController<TUserRaw = any> extends BaseController<UpdateUserDTOEnd> {

  constructor(
    private useCase: UpdateUserUseCase,
    private readonly userMapper: IPresenterMapper<User, TUserRaw>,
  ){
    super();
  }


  async executeImpl(){
    const params = this.getParams() as unknown as UpdateUserParams;
    const body = this.getBody() as UpdateUserBody;
    try {
      const result = await this.useCase.execute({params, body});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof UpdateUserUseCaseErrors.InvalidUserIdValue:
          case error instanceof UpdateUserUseCaseErrors.InvalidFieldValue:
            return this.clientError(exception.message, exception.metadata as Record<string, any>);
          case error instanceof UpdateUserUseCaseErrors.UserNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const user = this.userMapper.toPresentation(result.value.getValue().user);
      return this.okBuild({data: user});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}