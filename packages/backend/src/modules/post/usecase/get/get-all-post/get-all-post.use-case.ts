import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { IPostRepo } from "../../../repository/post.repository.port";
import { GetAllPostDTORequest, GetAllPostDTOResponse } from "./get-all-post.dto";
import { Result, left, right } from "~/common/core/result";
import { GetAllPostResponse } from "./get-all-post.response";




export class GetAllPostUseCase implements UseCase<GetAllPostDTORequest, Promise<GetAllPostResponse>>{

  constructor(
    private readonly postRepository: IPostRepo
  ){}

  async execute(request: GetAllPostDTORequest): Promise<GetAllPostResponse> {
    try {

      let page = request.query.paginate.page;
      let dataPerPage = request.query.paginate.dataPerPage;

      const posts = await this.postRepository.find({}, {paginate: {dataPerPage, page}});
      const paginate = await this.postRepository.getPaginate({}, {dataPerPage, page});

      return right(Result.ok({posts, paginate}));
      // return right(Result.ok({}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}