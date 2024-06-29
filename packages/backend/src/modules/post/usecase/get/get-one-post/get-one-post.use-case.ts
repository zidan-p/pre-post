import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetOnePostDTORequest } from "./get-one-post.dto";
import { GetOnePostResponse } from "./get-one-post.response";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { GetOnePostUseCaseErrors } from "./get-one-post.error";
import { Role } from "~/common/core/role.const";


export class GetOnePostUseCase implements UseCase<GetOnePostDTORequest, Promise<GetOnePostResponse>>{

  constructor(
    private postRepo: IPostRepo,
    private userRepo: IUserRepo,
  ){}

  async execute(request: GetOnePostDTORequest): Promise<GetOnePostResponse> {
    try{
      const authUser = request.user;
      const postId = request.params?.postId;

      if(!postId) return left(new GetOnePostUseCaseErrors.InvalidId("post id not provided"));

      const post = await this.postRepo.findById(postId);
      if(!post) return left(new GetOnePostUseCaseErrors.PostNotFound(postId));

      // check if this reqeust carry a user
      
      if(authUser){
        const user = await this.userRepo.getUserByUserId(authUser.id);
        if(!user) return left(new GetOnePostUseCaseErrors.UserNotFound(authUser.id));

        // check owner ship post if not admin
        if(user.role !== Role.ADMIN){
          if(post.ownerId.getStringValue() !== authUser.id){
            return left(new GetOnePostUseCaseErrors.ForbiddenAccess("You are not the owner of this post"));
          }
        }

        return right(Result.ok({post}));
      }

      // check if post Published.
      // for security reason, then status code is notfound
      if(!post.isPublished) return left(new GetOnePostUseCaseErrors.PostNotFound("Post Not Found"));

      return right(Result.ok({post}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}