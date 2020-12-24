import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAccountDto, LoginDto, LoginVm } from './models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create-account')
  signUp(@Body() createUserDto: CreateAccountDto) {
    return this.authService.createAccount(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() loginDto: LoginDto): Promise<LoginVm> {
    return this.authService.signIn(loginDto);
  }
}
