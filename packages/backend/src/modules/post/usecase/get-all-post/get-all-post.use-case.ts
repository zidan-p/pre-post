import { UseCase } from "~/common/core/UseCase";
import { AppError } from "~/common/core/AppError";
import { IPostRepo } from "../../repository/post.repository.port";
import { GetAllPostDTORequest, GetAllPostDTOResponse } from "./get-all-post.dto";
import { query } from "express";
import { Result, left, right } from "~/common/core/Result";
import { GetAllPostResponse } from "./get-all-post.response";




export class GetAllPostUseCase implements UseCase<GetAllPostDTORequest, Promise<GetAllPostResponse>>{

  constructor(
    private readonly postRepository: IPostRepo
  ){}

  async execute(request: GetAllPostDTORequest): Promise<GetAllPostResponse> {
    try {

      let page = request.query.page;
      let dataPerPage = request.query.dataPerPage;

      const posts = await this.postRepository.find({}, {paginate: {dataPerPage, page}});
      const paginate = await this.postRepository.getPaginate({}, {dataPerPage, page});

      return right(Result.ok({posts, paginate}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}