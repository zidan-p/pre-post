import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetUserDTORequest } from "./get-user.dto";
import { GetUserResponse } from "./get-user.response";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";
import { GetUserUseCaseErrors } from "./get-user.error";


export class GetUserUseCase implements UseCase<GetUserDTORequest, Promise<GetUserResponse>>{

  constructor(
    private readonly userRepo: IUserRepo,
  ){}

  async execute(request: GetUserDTORequest): Promise<GetUserResponse> {
    try{

      const userId = request.params?.userId;

      if(!userId) return left (new GetUserUseCaseErrors.InvalidUserIdValue(userId));

      const user = await this.userRepo.getUserByUserId(userId);
      if(!user) return left(new GetUserUseCaseErrors.userNotFound(userId));

      return right(Result.ok({user}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}