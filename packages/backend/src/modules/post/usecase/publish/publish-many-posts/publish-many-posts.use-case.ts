import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { PublishManyPostsDTORequest } from "./publish-many-posts.dto";
import { PublishManyPostsResponse } from "./publish-many-posts.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { PublishManyPostsUseCaseErrors } from "./publish-many-posts.error";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";


export class PublishManyPostsUseCase implements UseCase<PublishManyPostsDTORequest, Promise<PublishManyPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
  ){}

  async execute(request: PublishManyPostsDTORequest): Promise<PublishManyPostsResponse> {
    try{
      const idCollection = request.body.postIds;
      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));

      // build post id object first;
      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);
      if(postIdCollectionBuilderResult.isFailure)
        return left(new PublishManyPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

      const existsCount = await this.postRepo.countIsInSearch({postId: postIdCollection});

      // when only there some post that not found
      if(existsCount < postIdCollection.length){
        return left(new PublishManyPostsUseCaseErrors.SomePostNotFound(idCollection));
      }

      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}