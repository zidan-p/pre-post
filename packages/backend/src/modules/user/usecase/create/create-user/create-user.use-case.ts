import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { CreateUserDTORequest } from "./create-user.dto";
import { CreateUserResponse } from "./create-user.response";
import { UserEmail } from "~/modules/user/domain/user-email.value-object";
import { UserName } from "~/modules/user/domain/user-name.value-object";
import { UserPassword } from "~/modules/user/domain/user-password.value-object";
import { RoleValue } from "~/common/core/role.const";
import { CreateUserUseCaseErrors } from "./create-user.error";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";
import { User } from "~/modules/user/domain/user.agreegate-root";


export class CreateUserUseCase implements UseCase<CreateUserDTORequest, Promise<CreateUserResponse>>{

  constructor(
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: CreateUserDTORequest): Promise<CreateUserResponse> {
    let userEmail: UserEmail;
    let userName: UserName;
    let userPassword: UserPassword;
    let userRole: RoleValue;
    try{

      const body = request?.body;

      // check each field
      if(!body.email) return left(new CreateUserUseCaseErrors.FieldNotProvided("user", "email"));
      if(!body.username) return left(new CreateUserUseCaseErrors.FieldNotProvided("user", "username"));
      if(!body.password) return left(new CreateUserUseCaseErrors.FieldNotProvided("user", "password"));
      if(!body.role) return left(new CreateUserUseCaseErrors.FieldNotProvided("user", "role"));

      const emailOrError = UserEmail.create(body.email);
      const usernameOrError = UserName.create({name: body.username});
      const passwordOrError = UserPassword.create({ value: body.password });

      const combineResult = Result.combine<any>([emailOrError, usernameOrError, passwordOrError]);

      if (combineResult.isFailure) {
        return left(new CreateUserUseCaseErrors.FailBuildingUser(combineResult.getErrorValue()));
      }

      // check existstence
      const isUserExists = await this.userRepo.existsByEmail(emailOrError.getValue());
      if(isUserExists) return left(new CreateUserUseCaseErrors.UserAlreadyExists("user already exists", "email", emailOrError.getValue().value));

      const userOrError = User.create({
        email: emailOrError.getValue(),
        username: usernameOrError.getValue(),
        password: passwordOrError.getValue(),
        role: body.role
      });

      if(userOrError.isFailure) return left(new CreateUserUseCaseErrors.FailBuildingUser(userOrError.getErrorValue()));

      // save the user
      const user = await this.userRepo.save(userOrError.getValue());

      return right(Result.ok({user: userOrError.getValue()}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}