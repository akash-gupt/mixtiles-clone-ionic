import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from './get-user.decorator';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UsersController');
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  getMe(@GetUser() user: UserEntity): UserEntity {
    return user;
  }
}
