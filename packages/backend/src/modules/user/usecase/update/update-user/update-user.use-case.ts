import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateUserDTORequest } from "./update-user.dto";
import { UpdateUserResponse } from "./update-user.response";
import { UpdateUserUseCaseErrors } from "./update-user.error";
import { UserId } from "~/modules/user/domain/user-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";
import { User } from "~/modules/user/domain/user.agreegate-root";
import { SaveStatus } from "~/common/core/save.status";


export class UpdateUserUseCase implements UseCase<UpdateUserDTORequest, Promise<UpdateUserResponse>>{

  constructor(
    private userRepo: IUserRepo
  ){}

  async execute(request: UpdateUserDTORequest): Promise<UpdateUserResponse> {
    try{

      // validate id
      const id = request?.params?.userId;
      if(!id) return left(new UpdateUserUseCaseErrors.InvalidUserIdValue("userId not provided", id));
      const userIdOrError = UserId.create(new UniqueEntityID(id));
      if(userIdOrError.isFailure) 
        return left(new UpdateUserUseCaseErrors.IssueWhenBuilding(userIdOrError.getErrorValue().message));


      // validate props
      const validateEditableFieldOrError = User.validateEditableField(request?.body);
      if(validateEditableFieldOrError.isFailure)
        return left(new UpdateUserUseCaseErrors.InvalidFieldValue(
          validateEditableFieldOrError.getErrorValue().message,
          validateEditableFieldOrError.getErrorValue().metadata,
        ))

      const validatedEditablrField = validateEditableFieldOrError.getValue();

      const user = await this.userRepo.getUserByUserId(id);

      if(!user) return left(new UpdateUserUseCaseErrors.UserNotFound(id));


      // update user
      if(validatedEditablrField.userEmail) user.email = validatedEditablrField.userEmail;
      if(validatedEditablrField.userName) user.username = validatedEditablrField.userName;
      if(validatedEditablrField.userPassword) user.password = validatedEditablrField.userPassword;
      if(validatedEditablrField.userRole) user.role = validatedEditablrField.userRole;

      const result = await this.userRepo.save(user);

      if(result !== SaveStatus.UPDATED) 
        return left(new UpdateUserUseCaseErrors.InvalidOperation("the operation shoudl be [ " + SaveStatus.UPDATED + " ]"));

      return right(Result.ok({user}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}