import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetAllPublishedPostsDTORequest } from "./get-all-published-posts.dto";
import { GetAllPublishedPostsResponse } from "./get-all-published-posts.response";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";


export class GetAllPublishedPostsUseCase implements UseCase<GetAllPublishedPostsDTORequest, Promise<GetAllPublishedPostsResponse>>{

  constructor(
    private readonly postRepository: IPostRepo
  ){}

  async execute(request: GetAllPublishedPostsDTORequest): Promise<GetAllPublishedPostsResponse> {
    try{

      // TODO: make paginate accept undefined value and move default value there
      let page = request?.query?.paginate?.page ?? 1;
      let dataPerPage = request?.query?.paginate?.dataPerPage ?? 10;

      const posts = await this.postRepository.find({isPublised: true}, {paginate: {dataPerPage, page}});
      const paginate = await this.postRepository.getPaginate({isPublised: true}, {dataPerPage, page});

      return right(Result.ok({posts, paginate}));
    } catch (error) {
      console.log(error)
      return left(new AppError.UnexpectedError(error));
    }
  }
  
}