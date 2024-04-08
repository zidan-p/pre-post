import { UseCase } from "~/common/core/UseCase";
import { RefreshTokenDTO, RefreshTokenResponseDTO } from "./refresh-token.dto";
import { RefresTokenResponse } from "./refresh-token.response";
import { AppError } from "~/common/core/AppError";
import { Result, left, right } from "~/common/core/Result";
import { JWTClaims, JWTToken } from "../../domain/jwt.interface";
import { IUserRepo } from "../../repository/user.repository.port";
import { IAuthService } from "../../service/auth.service.interface";
import { RefresTokenUseCaseError } from "./refresh-token.error";
import { User } from "../../domain/user.agregate-root";






export class RefreshTokenUseCase implements UseCase<RefreshTokenDTO, Promise<RefresTokenResponse>>{

  constructor(
    private readonly userRepo: IUserRepo,
    private readonly authService: IAuthService,
  ){}
  
  async execute(request?: RefreshTokenDTO): Promise<RefresTokenResponse> {
    let decodedRefreshToken: JWTClaims;
    let user: User;

    try {

      try {
        decodedRefreshToken = await  this.authService.decodeRefreshJWT(request.refreshToken);
      } catch (error) {
        return left(new RefresTokenUseCaseError.ExpireRefreshToken());
      }

      user = await this.userRepo.getUserByUserId(decodedRefreshToken.id);

      if(!user) return left( new RefresTokenUseCaseError.UserNotFound());


      const accessToken: JWTToken = this.authService.signJWT({
        adminUser: user.isAdminUser,
        email: user.email.value,
        id: user.id.toString(),
        isEmailVerified: user.isEmailVerified,
        username: user.username.value
      });

      return right(Result.ok<RefreshTokenResponseDTO>({accessToken}))


    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
}