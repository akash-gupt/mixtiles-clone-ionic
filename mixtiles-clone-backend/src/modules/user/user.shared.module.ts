import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserTokenService } from './user-token.service';
import { UserEntity } from './user.entity';
import { TokenModule } from '@api/modules/token';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TokenModule],
  providers: [UserService, UserTokenService],
  exports: [UserService, UserTokenService],
})
export class UserSharedModule {}
