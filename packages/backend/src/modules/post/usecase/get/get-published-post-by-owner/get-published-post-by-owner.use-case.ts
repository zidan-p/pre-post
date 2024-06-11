import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPublishedPostByOwnerDTORequest } from "./get-published-post-by-owner.dto";
import { GetPublishedPostByOwnerResponse } from "./get-published-post-by-owner.response";
import { GetPublishedPostByOwnerUseCaseErrors } from "./get-published-post-by-owner.error";
import { IPostRepo } from "~/modules/post/repository/post.repository.port";
import { IUserRepo } from "~/modules/post/repository/user.repository.port";


export class GetPublishedPostByOwnerUseCase implements UseCase<GetPublishedPostByOwnerDTORequest, Promise<GetPublishedPostByOwnerResponse>>{

  constructor(
    private readonly postRepo: IPostRepo,
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: GetPublishedPostByOwnerDTORequest): Promise<GetPublishedPostByOwnerResponse> {
    try{
      console.log(request);
      const userId = request.param?.userId;
      const pagiateQuery = request.query?.paginate;

      const owner = await this.userRepo.getUserByUserId(userId);

      if(!owner)
        return left(new GetPublishedPostByOwnerUseCaseErrors.OwnerNotFound(userId));

      const posts = await this.postRepo.find({ownerId: owner.userId, isPublised: true}, {paginate: pagiateQuery});
      const paginate = await this.postRepo.getPaginate({ownerId: owner.userId}, pagiateQuery);

      return right(Result.ok({paginate, posts}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}