import { UseCase } from "~/common/core/UseCase";
import { LoginDTO, LoginDTOResponse } from "./login.dto";
import { LoginResponse } from "./login.response";
import { IUserRepo } from "../../repository/user.repository.port";
import { IAuthService } from "../../service/auth.service.interface";
import { User } from "../../domain/user.agregate-root";
import { UserPassword } from "../../domain/user-password.value-object";
import { Result, left, right } from "~/common/core/Result";
import { UserEmail } from "../../domain/user-email.value-object";
import { ValidationFailException } from "~/common/exceptions";
import { LoginUseCaseErrors } from "./login.error";
import { JWTToken } from "../../domain/jwt.interface";
import { AppError } from "~/common/core/AppError";






export class LoginUseCase implements UseCase<LoginDTO, Promise<LoginResponse>>{

  constructor(
    private readonly userRepo: IUserRepo,
    private readonly authService: IAuthService,
  ){}

  public async execute(request: LoginDTO): Promise<LoginResponse> {

    let user: User;
    let userEmail: UserEmail;
    let password: UserPassword;

    try {

      console.log(request);
      const userEmailOrError = UserEmail.create(request.email);

      if(userEmailOrError.isFailure){
        console.error(userEmailOrError.getErrorValue().message);
      }
      const passwordOrError = UserPassword.create({ value: request.password });
      if(passwordOrError.isFailure){
        console.error(passwordOrError.getErrorValue().message);
      }

      const payloadResult = Result.combine([ userEmailOrError, passwordOrError ]);

      if (payloadResult.isFailure) {
        // return left(Result.fail<any>(new ValidationFailException("validation failure when creating payload", payloadResult.getErrorValue())));
        if(payloadResult.getErrorValue() instanceof ValidationFailException){
          return left(new LoginUseCaseErrors.LoginValidationError(payloadResult.getErrorValue() as ValidationFailException))
        }
        else return left(Result.fail(payloadResult.getErrorValue()));
      }

      userEmail = userEmailOrError.getValue();
      password = passwordOrError.getValue();

      console.log(userEmail, password)
      user = await this.userRepo.getUserByUserEmail(userEmail);
      console.log(user)
      const userFound = Boolean(user);

      if (!userFound) {
        return left(new LoginUseCaseErrors.EmailOrPasswordError("user not found"))
      }

      const passwordValid = await user.password.comparePassword(password.value);

      if (!passwordValid) {
        return left(new LoginUseCaseErrors.EmailOrPasswordError("error when login"))
      }

      const accessToken: JWTToken = this.authService.signJWT({
        username: user.username.value,
        email: user.email.value,
        isEmailVerified: user.isEmailVerified,
        userId: user.userId.getStringValue(),
        adminUser: user.isAdminUser,
      });

      return right(Result.ok<LoginDTOResponse>({
        accessToken
      }));


    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }


}