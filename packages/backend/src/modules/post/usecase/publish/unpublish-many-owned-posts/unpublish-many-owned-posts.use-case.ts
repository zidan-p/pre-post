import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UnpublishManyOwnedPostsDTORequest } from "./unpublish-many-owned-posts.dto";
import { UnpublishManyOwnedPostsResponse } from "./unpublish-many-owned-posts.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { UnpublishManyOwnedPostsUseCaseErrors } from "./unpublish-many-owned-posts.error";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { PostOwnershipService } from "~/modules/post/domain/service/post-ownership.service";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";


export class UnpublishManyOwnedPostsUseCase implements UseCase<UnpublishManyOwnedPostsDTORequest, Promise<UnpublishManyOwnedPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: UnpublishManyOwnedPostsDTORequest): Promise<UnpublishManyOwnedPostsResponse> {
    try{
      const idCollection = request.query.postIds;
      const userRequest = request.user;

      // when no collection id, return empty post.
      // no needed for ownership checking
      if(!idCollection) return right(Result.ok({posts: []})); 
      if(!Array.isArray(idCollection)) 
        return left(new UnpublishManyOwnedPostsUseCaseErrors.InvalidPostIdValue(String(idCollection)));


      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));

      // build post id object first;
      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);
      if(postIdCollectionBuilderResult.isFailure)
        return left(new UnpublishManyOwnedPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

      // check user exitance
      const user = await this.userRepo.getUserByUserId(userRequest.id);
      if(!user) return left(new UnpublishManyOwnedPostsUseCaseErrors.UserNotFound(userRequest.id))


      // check ownership of post of user
      // i use count to check, beacause the id is assumed will not same among all records
      const ownerId = user.userId;
      const existsCountWithThisOwnership = await this.postRepo.countIsInSearchWhere({postId: postIdCollection},{ownerId: ownerId});
      const posts = await this.postRepo.isInSearch({postId: postIdCollection});

      const ownerShipService = new PostOwnershipService();

      const ownerShipResult = ownerShipService.isPostExistAndOwned(
        ownerId, postIdCollection, existsCountWithThisOwnership, posts.length
      )

      if(ownerShipResult.isLeft()) return ownerShipResult;

      // loop for unpublishing
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