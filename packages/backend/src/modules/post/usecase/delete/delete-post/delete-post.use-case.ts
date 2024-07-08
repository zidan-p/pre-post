import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeletePostDTORequest } from "./delete-post.dto";
import { DeletePostResponse } from "./delete-post.response";
import { IPostRepo } from "../../../repository/post.repository.port";
import { DeletePostUseCaseErrors } from "./delete-post.error";
import { IStorageService } from "~/modules/post/service/storage.service.interface";
import { IPostImageRepo } from "~/modules/post/repository/post-image.repository.port";


export class DeletePostUseCase implements UseCase<DeletePostDTORequest, Promise<DeletePostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly postImageRepo: IPostImageRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: DeletePostDTORequest): Promise<DeletePostResponse> {
    try{

      const postId = request.param.postId;

      // const isExists = await this.postRepo.exists(postId);
      // if(isExists) return left(new DeletePostUseCaseErrors.PostNotFound(postId));
      const post = await this.postRepo.findById(postId);
      if(!post) return left(new DeletePostUseCaseErrors.PostNotFound(postId));

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

      return right(Result.ok({post}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}