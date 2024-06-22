import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteOwnedPostDTORequest } from "./delete-owned-post.dto";
import { DeleteOwnedPostResponse } from "./delete-owned-post.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";
import { DeleteOwnedPostUseCaseErrors } from "./delete-owned-post.error";
import { IStorageService } from "~/modules/post/service/storage.service.interface";
import { IPostImageRepo } from "~/modules/post/repository/post-image.repository.port";


export class DeleteOwnedPostUseCase implements UseCase<DeleteOwnedPostDTORequest, Promise<DeleteOwnedPostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly userRepo: IUserRepo,
    private readonly postImageRepo: IPostImageRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: DeleteOwnedPostDTORequest): Promise<DeleteOwnedPostResponse> {
    const postId = request.param.postId;
    const userRequest = request.user;
    try{

      // check user / owner exintence
      const owner = await this.userRepo.getUserByUserId(userRequest.id);
      if(!owner) return left(new DeleteOwnedPostUseCaseErrors.UserNotFound(userRequest.id));

      const post = await this.postRepo.findById(postId);
      if(!post) return left(new DeleteOwnedPostUseCaseErrors.PostNotFound(postId));

      // check if this user owned the post
      if(post.ownerId.getStringValue() !== owner.id.toString())
        return left(new DeleteOwnedPostUseCaseErrors.ForbiddenUser(postId))

      // check the image, remove if exists
      const image = post.imageManager.getImage;
      if(image){

        // remove image from storage
        const isImageStorageExists = await this.storageService.isFileExists(image);
        if(isImageStorageExists) await this.storageService.removeFile(image);

        // remove image from database
        await this.postImageRepo.remove(image.id);
      }

      await this.postRepo.delete(postId);

      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}