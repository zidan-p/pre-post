import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UnpublishManyPostsDTORequest } from "./unpublish-many-posts.dto";
import { UnpublishManyPostsResponse } from "./unpublish-many-posts.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { UnpublishManyPostsUseCaseErrors } from "./unpublish-many-posts.error";


export class UnpublishManyPostsUseCase implements UseCase<UnpublishManyPostsDTORequest, Promise<UnpublishManyPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo
  ){}

  async execute(request: UnpublishManyPostsDTORequest): Promise<UnpublishManyPostsResponse> {
    try{
      const idCollection = request.query.postIds;

      // when no collection id, return empty post.
      // no needed for ownership checking
      if(!idCollection) return right(Result.ok({posts: []})); 
      if(!Array.isArray(idCollection)) 
        return left(new UnpublishManyPostsUseCaseErrors.InvalidPostIdValue(idCollection));

      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));

      // build post id object first;
      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);
      if(postIdCollectionBuilderResult.isFailure){
        return left(new UnpublishManyPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));
      }

      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);
      const posts = await this.postRepo.isInSearch({postId: postIdCollection});

      // when only there some post that not found
      if(posts.length < postIdCollection.length){
        return left(new UnpublishManyPostsUseCaseErrors.SomePostNotFound(idCollection));
      }

      posts.forEach(async (post) => {
        post.unPublishPost();
        await this.postRepo.save(post);
      })
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}