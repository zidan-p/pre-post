import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { PublishPostDTORequest } from "./publish-post.dto";
import { PublishPostResponse } from "./publish-post.response";
import { IPostRepo } from "../../repository/post.repository.port";
import { PublishPostUseCaseErrors } from "./publish-post.error";


export class PublishPostUseCase implements UseCase<PublishPostDTORequest, Promise<PublishPostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
  ){}

  async execute(request: PublishPostDTORequest): Promise<PublishPostResponse> {
    try{
      
      const user = request.user;
      const postId = request.params.postId;

      const post = await this.postRepo.findById(postId);

      if(!post)
        return left(new PublishPostUseCaseErrors.PostNotFound(postId));
      
      if(post.ownerId.getStringValue() !== user.id)
        return left(new PublishPostUseCaseErrors.ForbiddenUser(user.id));


      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}