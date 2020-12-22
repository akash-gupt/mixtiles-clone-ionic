import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserSharedModule } from './user.shared.module';

@Module({
  imports: [UserSharedModule],
  controllers: [UserController],
})
export class UserModule {}
