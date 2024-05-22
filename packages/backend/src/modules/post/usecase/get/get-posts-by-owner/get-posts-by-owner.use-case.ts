import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPostsByOwnerDTORequest } from "./get-posts-by-owner.dto";
import { GetPostsByOwnerResponse } from "./get-posts-by-owner.response";
import { IPostRepo } from "../../../repository/post.repository.port";
import { IUserRepo } from "../../../repository/user.repository.port";
import { GetPostsByOwnerUseCaseErrors } from "./get-posts-by-owner.error";


export class GetPostsByOwnerUseCase implements UseCase<GetPostsByOwnerDTORequest, Promise<GetPostsByOwnerResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: GetPostsByOwnerDTORequest): Promise<GetPostsByOwnerResponse> {
    try{
      
      const ownerId = request.param.ownerId;
      const pagiateQuery = request.query;

      const owner = await this.userRepo.getUserByUserId(ownerId);

      if(!owner)
        return left(new GetPostsByOwnerUseCaseErrors.OwnerNotFound(ownerId));

      const posts = await this.postRepo.find({ownerId: owner.userId}, {paginate: pagiateQuery});
      const paginate = await this.postRepo.getPaginate({ownerId: owner.userId}, pagiateQuery);

      return right(Result.ok({paginate, posts}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}