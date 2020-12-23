import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(public readonly fileRepository: FileRepository) {}

  async createFile(userId: string, createFileDto: CreateFileDto) {
    try {
      const page = this.fileRepository.create({
        userId,
        ...createFileDto,
      });
      const createdPage = await this.fileRepository.save(page);
      return createdPage;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
