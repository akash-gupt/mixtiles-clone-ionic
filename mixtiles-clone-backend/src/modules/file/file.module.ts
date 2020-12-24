import { Module } from '@nestjs/common';
import { FileSharedModule } from './file-shared.module';
import { MulterModule } from '@nestjs/platform-express';

import { FileController } from './file.controller';

@Module({
  imports: [
    FileSharedModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
