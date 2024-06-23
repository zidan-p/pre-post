import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as AnonymousStartegy } from "passport-anonymous";
import passport from "passport";
import { DecodedJWT } from "./auth.type";



export class AuthService {
  constructor(){
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(
      new JWTStrategy(opts, async (payload: DecodedJWT, done) => {
        try {
          return done(null, payload.context);
        } catch (error) {
          console.log("passport auth error",error);
          return done(error);
        }
      })
    );

    passport.use(new AnonymousStartegy());
  }

  /** 
   * @description
   * only accept jwt auth, and throw unauthorized when the token is not provided or invalid 
   * @example
   * ```
   * const authService = new AuthService();
   * function exampleController(req, res) {
   *  const user = req.user; // IAuth 
   * }
   * 
   * // routes.ts
   * app.get("/test", authService.jwtAuth(), exampleController)
   * 
   * 
   * ```
   * */
  jwtAuth(){
    return passport.authenticate("jwt", {session: false, failWithError: true});
  }

  /**
   * @description accept jwt auth but optional, the token can be provided or not.
   * it's usefull when handling controller that use express `user` variable as optional.
   * or expose the endpoint to public but still return different value for certain user.
   * 
   * @example
   * ```
   * const authService = new AuthService();
   * function exampleController(req, res) {
   *  const user = req.user; // IAuth | undefined
   * }
   * 
   * // routes.ts
   * app.get("/test", authService.jwtAuth(), exampleController)
   * ```
   */
  jwtOptionalAuth(){
    return passport.authenticate(["jwt", "anonymous"], {session: false, failWithError: true});
  }
}

export const authService = new AuthService();
