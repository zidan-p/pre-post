import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetNewestPublishedPostDTORequest } from "./get-newest-published-post.dto";
import { GetNewestPublishedPostResponse } from "./get-newest-published-post.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";


export class GetNewestPublishedPostUseCase implements UseCase<GetNewestPublishedPostDTORequest, Promise<GetNewestPublishedPostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo
  ){}

  async execute(request: GetNewestPublishedPostDTORequest): Promise<GetNewestPublishedPostResponse> {
    try{
      const paginate = request.query;

      // get posts that ordered by time it's created.
      const posts = await this.postRepo.find( {isPublised: true}, {orderBy: [["dateTimeCreated", "DESC"]],paginate: paginate});

      // get pagination for above query
      const paginateData = await this.postRepo.getPaginate( {isPublised: true}, paginate);

      return right(Result.ok({paginate: paginateData, posts}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}