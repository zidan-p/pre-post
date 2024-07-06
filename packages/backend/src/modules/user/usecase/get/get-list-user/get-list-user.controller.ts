import { BaseController } from "~/common/core/controller.base";
import { GetListUserUseCase } from "./get-list-user.use-case";
import { GetListUserDTOEnd } from "./get-list-user.dto";
import { GetListUserUseCaseErrors } from "./get-list-user.error";
import { IGeneralPresenterMapper, IPresenterMapper } from "~/common/core/mapper";
import { User } from "~/modules/user/domain/user.agreegate-root";
import { IPaginate } from "~/common/types/paginate";



export class GetListUserController<TPostRaw = any, TPaginateRaw = any> extends BaseController<GetListUserDTOEnd> {

  constructor(
    private useCase: GetListUserUseCase,
    private readonly userMapper: IPresenterMapper<User, Promise<TPostRaw>>,
    private readonly pageMapper: IGeneralPresenterMapper<IPaginate, Promise<TPaginateRaw>>
  ){
    super();
  }


  async executeImpl(){
    try {
      const result = await this.useCase.execute({});
      
      if(result.isLeft()){
        console.log("[GetListUserController] is letf in in execution")
        const error = result.value;
        const exception = error.getErrorValue();
        console.log(exception);
        switch(true){
          case error instanceof GetListUserUseCaseErrors.InvalidProperties:
            return this.clientError(exception.message, exception?.metadata as Record<string, any>);
          case error instanceof GetListUserUseCaseErrors.FailBuildingUser:
          default:
            return  this.fail("unexpected error", exception);
          
        }
      }
      
      const value = result.value.getValue();
      const users = await Promise.all(value.users.map(user => this.userMapper.toPresentation(user)));
      const paginate = await this.pageMapper.toPresentation(value.paginate);
      return await this.okBuild({data: (users), pagination: paginate});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}