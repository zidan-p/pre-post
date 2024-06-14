import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { PublishPostDTORequest } from "./publish-post.dto";
import { PublishPostResponse } from "./publish-post.response";
import { IPostRepo } from "../../../repository/post.repository.port";
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
      
      // only admin that can freely publish
      if(user.role !== "ADMIN"){
        if(post.ownerId.getStringValue() !== user.id) 
          return left(new PublishPostUseCaseErrors.ForbiddenUser(user.id));
      }

      post.publishPost();
      await this.postRepo.save(post);
      
      return right(Result.ok({post})); 
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}