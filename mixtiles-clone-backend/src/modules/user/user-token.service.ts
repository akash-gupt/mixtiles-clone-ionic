import { Injectable } from '@nestjs/common';
import { generateOtp } from '@api/utils';
import { TokenService } from '@api/modules/token';

const RESET_PASSWORD_SECRET = 'RESET_1234';

@Injectable()
export class UserTokenService {
  constructor(private tokenService: TokenService) {}

  async generateResetToken(): Promise<string> {
    const code = generateOtp();
    return this.tokenService.generateToken({ code }, RESET_PASSWORD_SECRET);
  }

  async verifyResetToken(token: string) {
    return this.tokenService.verifyToken(token, RESET_PASSWORD_SECRET);
  }
}
