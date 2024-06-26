import { BaseController } from "~/common/core/controller.base";
import { UpdateManyPostUseCase } from "./update-many-post.use-case";
import { UpdateManyPostBody, UpdateManyPostDTOEnd, UpdateManyPostFiles, UpdateManyPostQuery } from "./update-many-post.dto";
import { UpdateManyPostUseCaseErrors } from "./update-many-post.error";



export class UpdateManyPostController extends BaseController<UpdateManyPostDTOEnd> {

  constructor(
    private useCase: UpdateManyPostUseCase,
  ){
    super();
  }


  async executeImpl(){

    const body = this.getBody() as UpdateManyPostBody;
    const file = this.getSingleFile() as UpdateManyPostFiles["postImage"];
    const query = this.getQueryData() as UpdateManyPostQuery;
    try {
      const result = await this.useCase.execute({body, files: {postImage: file}, query});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof UpdateManyPostUseCaseErrors.InvalidProperties:
          case error instanceof UpdateManyPostUseCaseErrors.InvalidImageManagerProps:
          case error instanceof UpdateManyPostUseCaseErrors.InvalidImageProperties:
            return this.clientError(exception.message, exception.cause);
            break;
          case error instanceof UpdateManyPostUseCaseErrors.SomePostNotFound :
          case error instanceof UpdateManyPostUseCaseErrors.PostNotFound :
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
            break;
          case error instanceof UpdateManyPostUseCaseErrors.FailBuildingPost : 
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      return this.ok(result.value.getValue(), "Success Update many posts");
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}