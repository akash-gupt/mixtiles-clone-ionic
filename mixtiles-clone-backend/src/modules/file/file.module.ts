import { Module } from '@nestjs/common';
import { FileSharedModule } from './file-shared.module';

import { FileController } from './file.controller';

@Module({
  imports: [FileSharedModule],
  controllers: [FileController],
})
export class FileModule {}
