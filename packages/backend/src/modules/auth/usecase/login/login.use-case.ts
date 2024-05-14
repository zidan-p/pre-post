import { UseCase } from "~/common/core/UseCase";
import { LoginDTO, LoginDTOResponse } from "./login.dto";
import { LoginResponse } from "./login.response";
import { IUserRepo } from "../../repository/user.repository.port";
import { IJWTService } from "../../service/jwt.service.interface";
import { User } from "../../domain/user.agregate-root";
import { UserPassword } from "../../domain/user-password.value-object";
import { Result, left, right } from "~/common/core/Result";
import { UserEmail } from "../../domain/user-email.value-object";
import { ArgumentInvalidException, ValidationFailException } from "~/common/exceptions";
import { LoginUseCaseErrors } from "./login.error";
import { JWTToken } from "../../domain/jwt.interface";
import { AppError } from "~/common/core/AppError";






export class LoginUseCase implements UseCase<LoginDTO, Promise<LoginResponse>>{

  constructor(
    private readonly userRepo: IUserRepo,
    private readonly authService: IJWTService,
  ){}

  public async execute(request: LoginDTO): Promise<LoginResponse> {

    let user: User;
    let userEmail: UserEmail;
    let password: UserPassword;

    try {

      console.log(request);
      const userEmailOrError = UserEmail.create(request.email);
      const passwordOrError = UserPassword.create({ value: request.password });
      
      if(userEmailOrError.isFailure)
        console.error(userEmailOrError.getErrorValue().message);

      if(passwordOrError.isFailure)
        console.error(passwordOrError.getErrorValue().message);

      const payloadResult = Result.combine([ userEmailOrError, passwordOrError ]);

      if (payloadResult.isFailure) {
        if(payloadResult.getErrorValue() instanceof ArgumentInvalidException){
          return left(new LoginUseCaseErrors.LoginValidationError(payloadResult.getErrorValue() as ArgumentInvalidException))
        }
        else return left(Result.fail(payloadResult.getErrorValue()));
      }

      userEmail = userEmailOrError.getValue();
      password = passwordOrError.getValue();


      const userOrFound = await this.userRepo.getUserByUserEmail(userEmail);

      if (!userOrFound) {
        return left(new LoginUseCaseErrors.EmailOrPasswordError("user not found"))
      }

      user = userOrFound;

      const passwordValid = await user.password.comparePassword(password.value);

      if (!passwordValid) {
        return left(new LoginUseCaseErrors.EmailOrPasswordError("incorrect password"))
      }

      const accessToken: JWTToken = this.authService.signJWT({
        username: user.username.value,
        email: user.email.value,
        isEmailVerified: user.isEmailVerified,
        id: user.userId.getStringValue(),
        adminUser: user.isAdminUser,
      });

      const refreshToken: JWTToken = this.authService.signRefreshJWT({
        username: user.username.value,
        email: user.email.value,
        isEmailVerified: user.isEmailVerified,
        id: user.userId.getStringValue(),
        adminUser: user.isAdminUser,
      })

      return right(Result.ok<LoginDTOResponse>({
        accessToken, refreshToken
      }));


    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }


}