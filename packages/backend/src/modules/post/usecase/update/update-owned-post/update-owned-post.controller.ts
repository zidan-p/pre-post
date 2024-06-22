import { BaseController } from "~/common/core/controller.base";
import { UpdateOwnedPostUseCase } from "./update-owned-post.use-case";
import { UpdateOwnedPostBody, UpdateOwnedPostDTOEnd, UpdateOwnedPostParams } from "./update-owned-post.dto";
import { IUserAuth } from "~/common/core/user.auth.interface";
import { UpdateOwnedPostUseCaseErrors } from "./update-owned-post.error";
import { IPresenterMapper } from "~/common/core/mapper";
import { Post } from "~/modules/post/domain/post.agregate-root";



export class UpdateOwnedPostController<TPostRaw extends Record<string, any> = Record<string, any>> extends BaseController<UpdateOwnedPostDTOEnd> {

  constructor(
    private useCase: UpdateOwnedPostUseCase,
    private postPresenterMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
  }


  async executeImpl(){
    const body = this.getBody() as UpdateOwnedPostBody;
    const param = this.getParams() as unknown as UpdateOwnedPostParams;
    const file = this.getSingleFile(); 
    const user = this.getUser();

    try {
      const result = await this.useCase.execute({body, param, files: {postImage: file}, user: user as IUserAuth});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof UpdateOwnedPostUseCaseErrors.InvalidProperties:
          case error instanceof UpdateOwnedPostUseCaseErrors.InvalidImageManagerProps:
          case error instanceof UpdateOwnedPostUseCaseErrors.InvalidImageProperties:
            return this.clientError(exception.message, exception.cause);
          
          case error instanceof UpdateOwnedPostUseCaseErrors.ForbiddenUser:
            return this.forbidden(exception.message, exception?.metadata as Record<string, any>);
          case error instanceof UpdateOwnedPostUseCaseErrors.UnauthorizeUser:
            return this.unauthorized(exception.message, exception?.metadata as Record<string, any>);
          case error instanceof UpdateOwnedPostUseCaseErrors.FailBuildingPost:
            return this.fail(exception.message, exception);
          
          case error instanceof UpdateOwnedPostUseCaseErrors.PostNotFound:
            return this.notFound(exception.message, exception?.metadata as Record<string, any>);
          
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      const dto = result.value;
      const presenterPost = this.postPresenterMapper.toPresentation(dto.getValue().post);
      return this.ok(presenterPost);
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}