import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteManyPostsDTORequest } from "./delete-many-posts.dto";
import { DeleteManyPostsResponse } from "./delete-many-posts.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { DeleteManyPostsUseCaseErrors } from "./delete-many-posts.error";
import { Post } from "~/modules/post/domain/post.agregate-root";
import { IStorageService } from "~/modules/post/service/storage.service.interface";
import { IPostImageRepo } from "~/modules/post/repository/post-image.repository.port";
import { prePostLogger } from "~/common/core/logger.entry";


export class DeleteManyPostsUseCase implements UseCase<DeleteManyPostsDTORequest, Promise<DeleteManyPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly postImageRepo: IPostImageRepo,
    private readonly storageService: IStorageService
  ){}

  async execute(request: DeleteManyPostsDTORequest): Promise<DeleteManyPostsResponse> {
    try{
      const idCollection = request?.query?.postIds;
      const limit = request.query?.limit ? Number(request.query?.limit) : undefined;

      // don't do anything when postIds is not provided or defined
      if(!Array.isArray(idCollection)) return right(Result.ok({postIds: []}));
      if(idCollection?.length === 0) right(Result.ok({postIds: []}));

      console.log(idCollection);

      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));
      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);

      if(postIdCollectionBuilderResult.isFailure)
        return left(new DeleteManyPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);
      const posts = await this.postRepo.isInSearch({postId: postIdCollection});

      // # remove all posts image from storage
      const imageRemovalResult = await this.removeImageForEachPost(posts);
      if(imageRemovalResult.isFailure)
        return left(new DeleteManyPostsUseCaseErrors.DeleteOperationFailed(imageRemovalResult.getErrorValue()));

      prePostLogger.log("success delete postIds image from database and storage : " + idCollection.join(", "));

      // i use count to check, beacause the id is assumed will not same among all records
      let affectedRows: number;

      const existsCount = await this.postRepo.countIsInSearch({postId: postIdCollection});
      
      // when the lenght of id count and row count from database not match, that's mean there are some miss id
      if(existsCount !== postIdCollection.length){
        return left(new DeleteManyPostsUseCaseErrors.SomePostNotFound(idCollection));
      }

      affectedRows = await this.postRepo.deleteMany(postIdCollection);

      return right(Result.ok({postIds: idCollection}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }


  async removeImageForEachPost(posts: Post[]){
    try {
      for await (const post of posts){
        const image = post.imageManager.getImage;
        if(image){
  
          // remove image from storage
          const isImageStorageExists = await this.storageService.isFileExists(image);
          if(isImageStorageExists) await this.storageService.removeFile(image);
  
          // remove image from database
          await this.postImageRepo.remove(image.id);
        }
      }
      return Result.ok();
    } catch (error) {
      return Result.fail(error);
    }

  }
  
}