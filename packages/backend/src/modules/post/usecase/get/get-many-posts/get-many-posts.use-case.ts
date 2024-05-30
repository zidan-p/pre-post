import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetManyPostsDTORequest } from "./get-many-posts.dto";
import { GetManyPostsResponse } from "./get-many-posts.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { GetManyPostsUseCaseErrors } from "./get-many-posts.error";


export class GetManyPostsUseCase implements UseCase<GetManyPostsDTORequest, Promise<GetManyPostsResponse>>{

  constructor(
    private readonly postRepo: IPostRepo
  ){}

  async execute(request: GetManyPostsDTORequest): Promise<GetManyPostsResponse> {
    try{

      const idCollection = request.body.postIds;
      const postIdCollectionOrError = idCollection.map(id => PostId.create(new UniqueEntityID(id)));

      const postIdCollectionBuilderResult = Result.combine(postIdCollectionOrError);

      if(postIdCollectionBuilderResult.isFailure)
        return left(new GetManyPostsUseCaseErrors.IssueWhenBuilding("There are issue when building post id collection"));

      const postIdCollection = Result.getCombinedValue(postIdCollectionOrError);

      // i use count to check, beacause the id is assumed will not same among all records
      let affectedRows: number;

      const posts = await this.postRepo.isInSearch({postId: postIdCollection});
      
      // when the lenght of id count and row count from database not match, that's mean there are some miss id
      if(posts.length !== postIdCollection.length)
        return left(new GetManyPostsUseCaseErrors.SomePostNotFound(idCollection));
      
      return right(Result.ok({posts}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}