import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetAllPostListDTORequest } from "./get-all-post-list.dto";
import { GetAllPostListResponse } from "./get-all-post-list.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";


export class GetAllPostListUseCase implements UseCase<GetAllPostListDTORequest, Promise<GetAllPostListResponse>>{

  constructor(
    private readonly postRepo: IPostRepo
  ){}

  async execute(request: GetAllPostListDTORequest): Promise<GetAllPostListResponse> {
    try{

      const query = request.query;
      const whereIncluded = request.query.whereIncluded;
      const whereExcluded = request.query.whereExcluded;
      const orderBy = request.query.orderBy;
      const where = request.query.where;
      const paginateQuery = request.query.paginate;

      const posts = await this.postRepo.findAdvance({where,orderBy, paginate: paginateQuery, whereExcluded, whereIncluded})
      const paginate = await this.postRepo.findAdvancePaginate({where,orderBy, paginate: paginateQuery, whereExcluded, whereIncluded})

      return right(Result.ok({paginate, posts}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}