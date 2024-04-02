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
      
      const userEmailOrError = UserEmail.create(request.email);
      const passwordOrError = UserPassword.create({ value: request.password });
      const payloadResult = Result.combine([ userEmailOrError, passwordOrError ]);

      if (payloadResult.isFailure) {
        return left(Result.fail<any>(new ValidationFailException("validation failure when creating payload", payloadResult.getErrorValue())));
      }

      userEmail = userEmailOrError.getValue();
      password = passwordOrError.getValue();

      user = await this.userRepo.getUserByUserEmail(userEmail);
      const userFound = !!user;

      if (!userFound) {
        return left(new LoginUseCaseErrors.EmailOrPasswordError())
      }

      const passwordValid = await user.password.comparePassword(password.value);

      if (!passwordValid) {
        return left(new LoginUseCaseErrors.EmailOrPasswordError())
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