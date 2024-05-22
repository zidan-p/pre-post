import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteManyPostsDTORequest } from "./delete-many-posts.dto";
import { DeleteManyPostsResponse } from "./delete-many-posts.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { DeleteManyPostsUseCaseErrors } from "./delete-many-posts.error";
import { UserId } from "~/modules/post/domain/user-id.value-object";


export class DeleteManyPostsUseCase implements UseCase<DeleteManyPostsDTORequest, Promise<DeleteManyPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
  ){}

  async execute(request: DeleteManyPostsDTORequest): Promise<DeleteManyPostsResponse> {
    try{
      const idCollection = request.body.postIds;
      const user = request.user;
      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));

      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);

      if(postIdCollectionBuilderResult.isFailure)
        return left(new DeleteManyPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

      // i use count to check, beacause the id is assumed will not same among all records
      let affectedRows: number;

      // allow admin to remove any post
      if(user.role === "ADMIN"){

        const existsCount = await this.postRepo.countIsInSearch({postId: postIdCollection});
        
        // when the lenght of id count and row count from database not match, that's mean there are some miss id
        if(existsCount !== postIdCollection.length){
          return left(new DeleteManyPostsUseCaseErrors.SomePostNotFound(idCollection));
        }

        affectedRows = await this.postRepo.deleteMany(postIdCollection);

      // restrict non admin user to delete, only allow when it own the post
      }else{
        const userIdOrError = UserId.create(new UniqueEntityID(user.id));

        if(userIdOrError.isFailure)
          return left(new DeleteManyPostsUseCaseErrors.FailBuilUser(user.id));
      
        const userId = userIdOrError.getValue();

        const existsCount = await this.postRepo.countIsInSearchWhere({postId: postIdCollection}, {ownerId: userId});

        // when the lenght of id count and row count from database not match, that's mean there are some miss id.
        // wheter beacause it's missing or because it's owned by another user
        // TODO: make checking what possibility that make this error fired.
        if(existsCount !== postIdCollection.length){
          return left(new DeleteManyPostsUseCaseErrors.ForbiddenAccess(user.id));
        }

        affectedRows = await this.postRepo.deleteMany(postIdCollection);
      }

      return right(Result.ok({affectedRecord: affectedRows}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}