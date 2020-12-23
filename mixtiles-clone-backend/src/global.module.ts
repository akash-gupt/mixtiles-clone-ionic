import { Module, Global } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [AuthModule],
  exports: [AuthModule],
})
export class GlobalModule {}
