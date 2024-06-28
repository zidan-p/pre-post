import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { UpdateManyUserDTORequest } from "./update-many-user.dto";
import { UpdateManyUserResponse } from "./update-many-user.response";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";
import { IdCollectionDomainService } from "~/modules/user/domain/service/id-collection.domain-service";
import { UpdateManyUserUseCaseErrors } from "./update-many-user.error";
import { UserEmail } from "~/modules/user/domain/user-email.value-object";
import { UserName } from "~/modules/user/domain/user-name.value-object";
import { UserPassword } from "~/modules/user/domain/user-password.value-object";
import { RoleValue } from "~/common/core/role.const";
import { SaveStatus } from "~/common/core/save.status";


export class UpdateManyUserUseCase implements UseCase<UpdateManyUserDTORequest, Promise<UpdateManyUserResponse>>{


  private readonly idCollectionDomainService = new IdCollectionDomainService();

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
      const idCollectionResult = this.idCollectionDomainService.filterIdCollection(request?.query?.userIds);
      if(idCollectionResult.isFailure) return left(new UpdateManyUserUseCaseErrors.IssueWhenBuilding(
        idCollectionResult.getErrorValue().message
      ));
      const userIdCollection = idCollectionResult.getValue();

      // build the all body

      if(request?.body?.email) {
        const userEmailOrError = UserEmail.create(request.body.email);
        if(userEmailOrError.isFailure) 
          return left(new UpdateManyUserUseCaseErrors.InvalidFieldValue("invalid email", "email", request.body.email));
        userEmail = userEmailOrError.getValue();
      }

      if(request?.body?.username) {
        const userNameOrError = UserName.create({"name": request.body.username});
        if(userNameOrError.isFailure) 
          return left(new UpdateManyUserUseCaseErrors.InvalidFieldValue("invalid username", "username", request.body.username));
        userName = userNameOrError.getValue();
      }

      if(request?.body?.password) {
        const userPasswordOrError = UserPassword.create({value: request.body.password});
        if(userPasswordOrError.isFailure) 
          return left(new UpdateManyUserUseCaseErrors.InvalidFieldValue("invalid password", "password", request.body.password));
        userPassword = userPasswordOrError.getValue();
      }
      

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