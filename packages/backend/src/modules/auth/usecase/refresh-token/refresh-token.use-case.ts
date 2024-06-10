import { UseCase } from "~/common/core/use-case";
import { RefreshTokenDTO, RefreshTokenResponseDTO } from "./refresh-token.dto";
import { RefresTokenResponse } from "./refresh-token.response";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { JWTClaims, JWTToken } from "../../domain/jwt.interface";
import { IUserRepo } from "../../repository/user.repository.port";
import { IJWTService } from "../../service/jwt.service.interface";
import { RefresTokenUseCaseError } from "./refresh-token.error";
import { User } from "../../domain/user.agregate-root";





/**
 * get access token by providing refresh token
 */
export class RefreshTokenUseCase implements UseCase<RefreshTokenDTO, Promise<RefresTokenResponse>>{

  constructor(
    private readonly userRepo: IUserRepo,
    private readonly authService: IJWTService,
  ){}
  
  async execute(request: RefreshTokenDTO): Promise<RefresTokenResponse> {
    let decodedRefreshToken: JWTClaims;
    let user: User;

    try {

      const isTokenValid = this.authService.isTokenValid(request.refreshToken);
      if(!isTokenValid) return left( new RefresTokenUseCaseError.MalformedToken());

      decodedRefreshToken = await this.authService.decodeRefreshJWT(request.refreshToken);
      if(!decodedRefreshToken) return left(new RefresTokenUseCaseError.ExpireRefreshToken());

      const userOrNotFound = await this.userRepo.getUserByUserId(decodedRefreshToken.id);
      if(!userOrNotFound) return left( new RefresTokenUseCaseError.UserNotFound());

      user = userOrNotFound;

      const accessToken: JWTToken = this.authService.signJWT({
        email: user.email.value,
        id: user.id.toString(),
        isEmailVerified: user.isEmailVerified,
        username: user.username.value,
        role: user.role
      });

      return right(Result.ok<RefreshTokenResponseDTO>({accessToken}))


    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
}