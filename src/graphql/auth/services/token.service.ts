import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserModel } from '../../../core/graphql/generated/user-model';
import { AccessToken } from '../dto/token-payload.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  public generateToken(payload: UserModel): AccessToken {
    const { id, status, roles, email, userName } = payload;
    const token = this.jwtService.sign({
      id,
      status,
      roles,
      email,
      userName,
    });

    return {
      token,
      createdAt: new Date(),
      expiresAt: new Date(
        Date.now() + this.config.get<number>('JWT_EXPIRES_IN_MINUTES') * 60 * 1000,
      ),
    };
  }

  public verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
