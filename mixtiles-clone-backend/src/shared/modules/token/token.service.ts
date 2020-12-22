import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  async generateToken(payload: any, secret: string, expiresIn = '15m') {
    return sign(payload, secret, { expiresIn });
  }

  async verifyToken(token: string, secret: string) {
    return verify(token, secret);
  }
}
