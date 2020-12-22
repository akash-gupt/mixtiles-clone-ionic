import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository])],
  exports: [FileService],
  providers: [FileService],
})
export class FileSharedModule {}
