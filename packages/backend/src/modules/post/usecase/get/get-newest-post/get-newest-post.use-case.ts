import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetNewestPostDTORequest } from "./get-newest-post.dto";
import { GetNewestPostResponse } from "./get-newest-post.response";
import { IPostRepo } from "../../../repository/post.repository.port";


export class GetNewestPostUseCase implements UseCase<GetNewestPostDTORequest, Promise<GetNewestPostResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
  ){}

  async execute(request: GetNewestPostDTORequest): Promise<GetNewestPostResponse> {
    try{
      const paginate = request.query;

      // get posts that ordered by time it's created.
      const posts = await this.postRepo.find( {}, {orderBy: [["dateTimeCreated", "DESC"]],paginate: paginate});

      // get pagination for above query
      const paginateData = await this.postRepo.getPaginate( {}, paginate);

      return right(Result.ok({paginate: paginateData, posts}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}