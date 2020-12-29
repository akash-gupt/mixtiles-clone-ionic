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
    // try {
    //   const file = this.fileRepository.create({
    //     userId,
    //     ...createFileDto,
    //   });
    //   const createdPage = await this.fileRepository.save(file);
    //   return createdPage;
    // } catch (error) {
    //   throw new HttpException(error, HttpStatus.BAD_REQUEST);
    // }
  }
}
