import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { GlobalModule } from './global.module';
import { ApiModule } from './modules/api.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GlobalModule,
    ApiModule,
    MorganModule.forRoot(),
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
