import { BaseController } from "~/common/core/controller.base";
import { GetManyUserUseCase } from "./get-many-user.use-case";
import { GetManyUserDTOEnd, GetManyUserQuery } from "./get-many-user.dto";
import { GetManyPostsUseCaseErrors } from "~/modules/post/usecase/get/get-many-posts/get-many-posts.error";
import { User } from "~/modules/user/domain/user.agreegate-root";
import { IPresenterMapper } from "~/common/core/mapper";



export class GetManyUserController<TUserRaw = any> extends BaseController<GetManyUserDTOEnd> {

  constructor(
    private useCase: GetManyUserUseCase,
    private readonly userMapper: IPresenterMapper<User, TUserRaw>,
  ){
    super();
  }


  async executeImpl(){
    console.log("mencapai get many user exec")
    const query = this.getQueryData() as GetManyUserQuery;
    try {
      const result = await this.useCase.execute({query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof GetManyPostsUseCaseErrors.InvalidPostIdValue:
            return this.clientError(exception.message, exception?.metadata as Record<string, any>);
          case error instanceof GetManyPostsUseCaseErrors.SomePostNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
          case error instanceof GetManyPostsUseCaseErrors.IssueWhenBuilding:
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const value = result.value.getValue(); 
      const users = value.users.map(user => this.userMapper.toPresentation(user));
      return this.okBuild({data: users});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}