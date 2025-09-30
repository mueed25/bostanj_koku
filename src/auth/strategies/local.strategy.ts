import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({ usernameField: 'email' });
    }

   async validate(email: string, password: string): Promise<any> {
  console.log('DEBUG LocalStrategy.validate', { email, password });
  const user = await this.authService.validateUser(email, password);
  console.log('DEBUG Found user:', user);
  if (!user) {
    throw new UnauthorizedException();
  }
  return user;
}

}