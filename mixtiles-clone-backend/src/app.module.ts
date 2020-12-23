import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { GlobalModule } from './global.module';
import { ApiModule } from './modules/api.module';

@Module({
  controllers: [AppController],
  imports: [TypeOrmModule.forRoot(typeOrmConfig), GlobalModule, ApiModule],
  providers: [AppService],
})
export class AppModule {}
