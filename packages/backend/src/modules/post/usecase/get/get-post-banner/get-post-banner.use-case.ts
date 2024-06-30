import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPostBannerDTORequest } from "./get-post-banner.dto";
import { GetPostBannerResponse } from "./get-post-banner.response";
import { GetPostBannerUseCaseErrors } from "./get-post-banner.error";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { IStorageService } from "~/modules/post/service/storage.service.interface";
import { Role } from "~/common/core/role.const";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { PostImage } from "~/modules/post/domain/post-image.entity";


export class GetPostBannerUseCase implements UseCase<GetPostBannerDTORequest, Promise<GetPostBannerResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly userRepo: IUserRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: GetPostBannerDTORequest): Promise<GetPostBannerResponse> {
    try{
      const authUser = request.user;
      const postId = request.params?.postId;

      if(!postId) return left(new GetPostBannerUseCaseErrors.InvalidId("post id not provided"));

      const post = await this.postRepo.findById(postId);
      if(!post) return left(new GetPostBannerUseCaseErrors.PostNotFound(postId));

      // check if this reqeust carry a user
      
      if(authUser){
        const user = await this.userRepo.getUserByUserId(authUser.id);
        if(!user) return left(new GetPostBannerUseCaseErrors.UserNotFound(authUser.id));

        // check owner ship post if not admin
        if(user.role !== Role.ADMIN){
          if(post.ownerId.getStringValue() !== authUser.id){
            return left(new GetPostBannerUseCaseErrors.ForbiddenAccess("You are not the owner of this post"));
          }
        }

        // check if banner exists
        if(!post.imageManager.isImageExists()) return left(new GetPostBannerUseCaseErrors.BannerNotFound(postId));

        // check image in storage
        const isExistsInStorage = await this.storageService.isFileExists(post.imageManager.getImage as PostImage);
        if(!isExistsInStorage) return left(new GetPostBannerUseCaseErrors.BannerNotFound(postId)) 
        return right(Result.ok({banner: post.imageManager.getImage as PostImage}));
      }

      // check if post Published.
      // for security reason, then status code is notfound
      if(!post.isPublished) return left(new GetPostBannerUseCaseErrors.PostNotFound("Post Not Found"));

      // check if image exists
      const isExistsInStorage = await this.storageService.isFileExists(post.imageManager.getImage as PostImage);
      if(!isExistsInStorage) return left(new GetPostBannerUseCaseErrors.BannerNotFound(postId)) 
        
      return right(Result.ok({banner: post.imageManager.getImage as PostImage}));

    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}