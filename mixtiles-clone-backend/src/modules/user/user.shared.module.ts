import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UsersEmailService } from './user-email.service';
import { UserTokenService } from './user-token.service';
import { User } from './user.entity';
import { EmailModule } from '@api/modules/email';
import { TokenModule } from '@api/modules/token';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule, TokenModule],
  providers: [UserService, UsersEmailService, UserTokenService],
  exports: [UserService, UsersEmailService, UserTokenService],
})
export class UserSharedModule {}
