import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { PublishManyOwnedPostsDTORequest } from "./publish-many-owned-posts.dto";
import { PublishManyOwnedPostsResponse } from "./publish-many-owned-posts.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { PublishManyOwnedPostsUseCaseErrors } from "./publish-many-owned-posts.error";


export class PublishManyOwnedPostsUseCase implements UseCase<PublishManyOwnedPostsDTORequest, Promise<PublishManyOwnedPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: PublishManyOwnedPostsDTORequest): Promise<PublishManyOwnedPostsResponse> {
    try{
      const idCollection = request.query.postIds;
      const userRequest = request.user;

      // when no collection id, return empty post.
      // no needed for ownership checking
      if(!idCollection) return right(Result.ok({posts: []})); 
      if(!Array.isArray(idCollection)) 
        return left(new PublishManyOwnedPostsUseCaseErrors.InvalidPostIdValue(String(idCollection)));

      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));

      // build post id object first;
      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);
      if(postIdCollectionBuilderResult.isFailure)
        return left(new PublishManyOwnedPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

      // check user exitance
      const user = await this.userRepo.getUserByUserId(userRequest.id);
      if(!user) return left(new PublishManyOwnedPostsUseCaseErrors.UserNotFound(userRequest.id))


      // check ownership of post of user
      // i use count to check, beacause the id is assumed will not same among all records
      const ownerId = user.userId;
      const existsCountWithThisOwnership = await this.postRepo.countIsInSearchWhere({postId: postIdCollection},{ownerId: ownerId});
      const posts = await this.postRepo.isInSearch({postId: postIdCollection});

      // when only there some post that not found
      if(posts.length < postIdCollection.length){
        return left(new PublishManyOwnedPostsUseCaseErrors.SomePostNotFound(idCollection));
      }

      // when the founded exists count wiith ownershipp less than that actually exists
      // the count already filtered so in this code always reach post id collection length that match exists count
      if(existsCountWithThisOwnership < posts.length)
        return left(new PublishManyOwnedPostsUseCaseErrors.ForbiddenAccess(userRequest.id));

      posts.forEach(async (post) => {
        post.publishPost();
        await this.postRepo.save(post);
      })
      
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}