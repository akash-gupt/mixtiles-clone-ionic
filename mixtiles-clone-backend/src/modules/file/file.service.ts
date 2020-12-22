import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(public readonly FileRepository: FileRepository) {
    super(FileRepository);
  }

  async createFile(userId: string, createFileDto: CreateFileDto) {
    try {
      const page = this.FileRepository.create({
        userId,
        ...createFileDto,
      });
      const createdPage = await this.FileRepository.save(page);
      return createdPage;
    } catch (error) {
      this.handleUniqueError(error);
    }
  }
}
