import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

import { JwtPayload } from './jwt-payload.interface';
import { CreateAccountDto, LoginDto } from './models';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createAccessToken(user: User, rememberMe?: boolean): Promise<string> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: rememberMe ? '365d' : '7d',
    });
  }

  async createAccount(createUserDto: CreateAccountDto): Promise<void> {
    return this.userService.createAccount(createUserDto);
  }

  async signIn(authCredentialsDto: LoginDto) {
    const user = await this.userService.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.createAccessToken(
      user,
      authCredentialsDto.remember,
    );
    return { accessToken };
  }
}
