import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeletePostDTORequest } from "./delete-post.dto";
import { DeletePostResponse } from "./delete-post.response";
import { IPostRepo } from "../../repository/post.repository.port";
import { DeletePostUseCaseErrors } from "./delete-post.error";


export class DeletePostUseCase implements UseCase<DeletePostDTORequest, Promise<DeletePostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
  ){}

  async execute(request: DeletePostDTORequest): Promise<DeletePostResponse> {
    try{

      const postId = request.param.postId;

      const isExists = await this.postRepo.exists(postId);

      if(isExists)
        return left(new DeletePostUseCaseErrors.PostNotFound(postId));

      await this.postRepo.delete(postId);

      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}