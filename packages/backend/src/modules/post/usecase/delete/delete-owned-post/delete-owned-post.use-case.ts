import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteOwnedPostDTORequest } from "./delete-owned-post.dto";
import { DeleteOwnedPostResponse } from "./delete-owned-post.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";
import { DeleteOwnedPostUseCaseErrors } from "./delete-owned-post.error";


export class DeleteOwnedPostUseCase implements UseCase<DeleteOwnedPostDTORequest, Promise<DeleteOwnedPostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly userRepo: IUserRepo,
  ){}

  async execute(request: DeleteOwnedPostDTORequest): Promise<DeleteOwnedPostResponse> {
    const postId = request.param.postId;
    const userRequest = request.user;
    try{

      // check user / owner exintence
      const owner = await this.userRepo.getUserByUserId(userRequest.id);
      if(!owner) return left(new DeleteOwnedPostUseCaseErrors.UserNotFound(userRequest.id));

      // check post existence
      const post = await this.postRepo.findById(postId);
      if(!post) return left(new DeleteOwnedPostUseCaseErrors.PostNotFound(postId));


      // check if current user own the post
      if(!post.isOwnedBy(owner.userId)) return left(new DeleteOwnedPostUseCaseErrors.ForbiddenUser(owner.userId.getStringValue()));

      await this.postRepo.delete(post.postId);

      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}