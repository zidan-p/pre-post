import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteUserDTORequest } from "./delete-user.dto";
import { DeleteUserResponse } from "./delete-user.response";
import { DeleteUserUseCaseErrors } from "./delete-user.error";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";


export class DeleteUserUseCase implements UseCase<DeleteUserDTORequest, Promise<DeleteUserResponse>>{

  constructor(
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: DeleteUserDTORequest): Promise<DeleteUserResponse> {
    try{

      const userId = request.params?.userId;

      if(!userId) return left (new DeleteUserUseCaseErrors.InvalidUserIdValue(userId));

      const user = await this.userRepo.getUserByUserId(userId);
      if(!user) return left(new DeleteUserUseCaseErrors.UserNotFound(userId));

      // delete user
      user.delete();

      const result = await this.userRepo.save(user);

      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}