import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as AnonymousStartegy } from "passport-anonymous";
import passport from "passport";



export class AuthService {
  constructor(){
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(
      new JWTStrategy(opts, async (payload, done) => {
        try {
          console.log("payload jwt")
          console.log(payload)
          return done(null, payload);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      })
    );

    passport.use(new AnonymousStartegy());
  }

  jwtAuth(){
    return passport.authenticate("jwt", {session: false});
  }

  jwtOptionalAuth(){
    return passport.authenticate(["jwt", "anonymous"], {session: false});
  }
}

export const authService = new AuthService();
