import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser, GetUserId } from './get-user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UsersController');
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Put()
  @ApiOperation({ description: 'Update Profile' })
  async update(
    @GetUserId() userId: number,
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateProfile(userId, body);
  }
}
