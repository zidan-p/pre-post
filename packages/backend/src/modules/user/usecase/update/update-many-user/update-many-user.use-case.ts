import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateManyUserDTORequest } from "./update-many-user.dto";
import { UpdateManyUserResponse } from "./update-many-user.response";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";
import { UpdateManyUserUseCaseErrors } from "./update-many-user.error";
import { UserEmail } from "~/modules/user/domain/user-email.value-object";
import { UserName } from "~/modules/user/domain/user-name.value-object";
import { UserPassword } from "~/modules/user/domain/user-password.value-object";
import { Role, RoleValue } from "~/common/core/role.const";
import { SaveStatus } from "~/common/core/save.status";
import { User } from "~/modules/user/domain/user.agreegate-root";
import { UserId } from "~/modules/user/domain/user-id.value-object";


export class UpdateManyUserUseCase implements UseCase<UpdateManyUserDTORequest, Promise<UpdateManyUserResponse>>{



  constructor(
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: UpdateManyUserDTORequest): Promise<UpdateManyUserResponse> {
    let userEmail: UserEmail | undefined;
    let userName: UserName | undefined;
    let userPassword: UserPassword | undefined;
    let userRole: RoleValue | undefined;
    try{

      // get id collection
      const idCollectionResult = UserId.validateIdCollection(request?.query?.userIds);
      if(idCollectionResult.isFailure) return left(new UpdateManyUserUseCaseErrors.IssueWhenBuilding(
        idCollectionResult.getErrorValue().message
      ));
      const userIdCollection = idCollectionResult.getValue();

      // check body request
      if(!request?.body) 
        return left (new UpdateManyUserUseCaseErrors.InvalidFieldValue("invalid body request", {field: "body", value: request?.body}));

      // build the all body
      const validateEditableFieldOrError = User.validateEditableField(request?.body);
      if(validateEditableFieldOrError.isFailure)
        return left(new UpdateManyUserUseCaseErrors.InvalidFieldValue(
          validateEditableFieldOrError.getErrorValue().message,
          validateEditableFieldOrError.getErrorValue().metadata,
        ))

      const users = await this.userRepo.find({whereIncluded: {userId: userIdCollection}});

      // check if all post found
      if(users.length !== userIdCollection.length){
        return left(new UpdateManyUserUseCaseErrors.SomeUserNotFound(request?.query!.userIds!));
      };

      // update post data
      for(const userKey in users) {
        if(userEmail) users[userKey].email = userEmail;
        if(userName) users[userKey].username = userName;
        if(userPassword) users[userKey].password = userPassword;
      }

      // save each users
      for await(const user of users) { 
        const result = await this.userRepo.save(user);
        if(result !== SaveStatus.UPDATED) return left(
          new UpdateManyUserUseCaseErrors.InvalidOperation("invalid operation when update user with id : " + user.id.toString() + ", status : " + result)
        )
      }

      return right(Result.ok({affectedRecord: users.length}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}