import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import * as fs from 'fs'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TokenPayload } from '../../domain/dto/token-payload.dto'
import { UserService } from './../../../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs
        .readFileSync(configService.get<string>('JWT_PUBLIC_KEY'))
        .toString(),
      algorithms: 'RS512',
    })
  }

  validate = async (payload: TokenPayload) => {
    if (!payload) return null
    return this.userService.find({ where: { id: payload.id } })
  }
}
