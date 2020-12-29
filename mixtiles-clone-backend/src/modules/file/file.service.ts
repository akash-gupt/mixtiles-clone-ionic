import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { FileEntity } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async createFile(userId: string, createFileDto: CreateFileDto) {
    const records = [];
    const { fileNames, frameType } = createFileDto;
    try {
      for (let index = 0; index < fileNames.length; index++) {
        const fileName = fileNames[index];
        const file = this.fileRepository.create({
          userId,
          fileName,
          frameType,
        });
        const createdPage = await this.fileRepository.save(file);
        records.push(createdPage);
      }

      return records;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
