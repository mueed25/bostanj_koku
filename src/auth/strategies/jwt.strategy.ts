
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/constants/constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
            return req?.cookies?.access_token || null;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }



  async validate(payload: any) {
    console.log('DEBUG JWT Payload:', payload);
    return { userId: payload.sub, email: payload.email };
  }
}
