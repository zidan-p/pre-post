import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetPostsByCurrentUserDTORequest } from "./get-posts-by-current-user.dto";
import { GetPostsByCurrentUserResponse } from "./get-posts-by-current-user.response";
import { IPostRepo } from "../../../repository/post.repository.port";
import { IUserRepo } from "../../../repository/user.repository.port";
import { GetPostsByCurrentUserUseCaseErrors } from "./get-posts-by-current-user.error";
import { IPaginate } from "~/common/types/paginate";


export class GetPostsByCurrentUserUseCase implements UseCase<GetPostsByCurrentUserDTORequest, Promise<GetPostsByCurrentUserResponse>>{

  constructor(
    private readonly postRepository: IPostRepo,
    private readonly userRepository: IUserRepo
  ){}

  async execute(request: GetPostsByCurrentUserDTORequest): Promise<GetPostsByCurrentUserResponse> {
    try{

      const user = request.user;
      const paginateQuery = request?.query?.paginate;

      const owner = await this.userRepository.getUserByUserId(user.id);

      if(!owner)
        return left(new GetPostsByCurrentUserUseCaseErrors.UserNotFound(user.id));

      const posts = await this.postRepository.find({ownerId: owner.userId});
      const paginate = await this.postRepository.getPaginate({ownerId: owner.userId}, paginateQuery);


      return right(Result.ok({
        paginate, posts
      }));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}