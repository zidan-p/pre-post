import { BaseController } from "~/common/core/controller.base";
import { UpdateManyOwnedPostUseCase } from "./update-many-owned-post.use-case";
import { UpdateManyOwnedPostBody, UpdateManyOwnedPostDTOEnd, UpdateManyOwnedPostFiles, UpdateManyOwnedPostQuery } from "./update-many-owned-post.dto";
import { UpdateManyOwnedPostUseCaseErrors } from "./update-many-owned-post.error";



export class UpdateManyOwnedPostController extends BaseController<UpdateManyOwnedPostDTOEnd> {

  constructor(
    private useCase: UpdateManyOwnedPostUseCase
  ){
    super();
  }


  async executeImpl(){
    const body = this.getBody() as UpdateManyOwnedPostBody;
    const file = this.getSingleFile();
    const query = this.getQueryData() as UpdateManyOwnedPostQuery;
    const user = this.getUser()!;
    try {
      const result = await this.useCase.execute({user, body, files: {postImage: file},query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof UpdateManyOwnedPostUseCaseErrors.ForbiddenUser:
            return this.forbidden(exception.message);
          case error instanceof UpdateManyOwnedPostUseCaseErrors.UnauthorizeUser:
            return this.unauthorized(exception.message);
          case error instanceof UpdateManyOwnedPostUseCaseErrors.InvalidProperties:
          case error instanceof UpdateManyOwnedPostUseCaseErrors.InvalidImageManagerProps:
          case error instanceof UpdateManyOwnedPostUseCaseErrors.InvalidImageProperties:
            return this.clientError(exception.message, exception.cause);
            break;
          case error instanceof UpdateManyOwnedPostUseCaseErrors.SomePostNotFound :
          case error instanceof UpdateManyOwnedPostUseCaseErrors.PostNotFound :
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
            break;
          case error instanceof UpdateManyOwnedPostUseCaseErrors.FailBuildingPost : 
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      return this.ok(result.value.getValue());
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}