import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { GlobalModule } from './global.module';
import { ApiModule } from './modules/api.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), GlobalModule, ApiModule],
})
export class AppModule {}
