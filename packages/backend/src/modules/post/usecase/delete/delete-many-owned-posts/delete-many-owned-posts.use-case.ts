import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteManyOwnedPostsDTORequest } from "./delete-many-owned-posts.dto";
import { DeleteManyOwnedPostsResponse } from "./delete-many-owned-posts.response";
import { DeleteManyOwnedPostsUseCaseErrors } from "./delete-many-owned-posts.error";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { UserId } from "~/modules/post/domain/user-id.value-object";


export class DeleteManyOwnedPostsUseCase implements UseCase<DeleteManyOwnedPostsDTORequest, Promise<DeleteManyOwnedPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo
  ){}

  async execute(request: DeleteManyOwnedPostsDTORequest): Promise<DeleteManyOwnedPostsResponse> {
    try{
      const idCollection = request.body.postIds;
      const user = request.user;
      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));

      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);
      if(postIdCollectionBuilderResult.isFailure)
        return left(new DeleteManyOwnedPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));


      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

      // i use count to check, beacause the id is assumed will not same among all records
      let affectedRows: number;

      const userIdOrError = UserId.create(new UniqueEntityID(user.id));

      if(userIdOrError.isFailure)
        return left(new DeleteManyOwnedPostsUseCaseErrors.FailBuilUser(user.id));
    
      const userId = userIdOrError.getValue();

      // check existing rows
      const existsCount = await this.postRepo.countIsInSearchWhere({postId: postIdCollection}, {ownerId: userId});

      // when the lenght of id count and row count from database not match, that's mean there are some miss id.
      // wheter beacause it's missing or because it's owned by another user
      // TODO: make checking what possibility that make this error fired.
      if(existsCount !== postIdCollection.length){
        return left(new DeleteManyOwnedPostsUseCaseErrors.ForbiddenAccess(user.id));
      }

      affectedRows = await this.postRepo.deleteMany(postIdCollection);

      return right(Result.ok({affectedRecord: affectedRows}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}