import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UnpublishPostDTORequest } from "./unpublish-post.dto";
import { UnpublishPostResponse } from "./unpublish-post.response";
import { IPostRepo } from "../../../repository/post.repository.port";
import { IUserRepo } from "../../../repository/user.repository.port";
import { UnpublishPostUseCaseErrors } from "./unpublish-post.error";


export class UnpublishPostUseCase implements UseCase<UnpublishPostDTORequest, Promise<UnpublishPostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: UnpublishPostDTORequest): Promise<UnpublishPostResponse> {
    try{

      const ownerId = request.user.id;
      const postId = request.params.postId;


      const user = await this.userRepo.getUserByUserId(ownerId);

      if(!user) 
        return left(new UnpublishPostUseCaseErrors.NotFoundUser(ownerId));

      const post = await this.postRepo.findById(postId);

      if(!post)
        return left(new UnpublishPostUseCaseErrors.PostNotFound(postId));

      if(post.ownerId !== user.userId)
        return left(new UnpublishPostUseCaseErrors.ForbiddenUser(user.id.toString()));

      post.unPublishPost();

      this.postRepo.save(post);

      return right(Result.ok({post}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}