import { UseCase } from "~/common/core/UseCase";
import { AppError } from "~/common/core/AppError";
import { IPostRepo } from "../../repository/post.repository.port";
import { query } from "express";
import { Result, left, right } from "~/common/core/Result";
import { DeletePostResponse } from "./delete-post.response";
import { DeletePostDTORequest } from "./delete-post.dto";
import { DeletePostUseCaseErrors } from "./delete-post.error";




export class DeletePostUseCase implements UseCase<DeletePostDTORequest, Promise<DeletePostResponse>>{

  constructor(
    private readonly postRepository: IPostRepo
  ){}

  async execute(request: DeletePostDTORequest): Promise<DeletePostResponse> {
    try {

      const postId = request.param.postId;
      const post = await this.postRepository.findById(postId);

      if(!post) throw new DeletePostUseCaseErrors.PostNotFound("Post with id [ " + postId + " ] not found");

      this.postRepository.delete(post.postId);
      
      return right(Result.ok({post}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}