import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { GetUserId } from '../user/get-user.decorator';

@Controller('files')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class FileController {
  constructor(public readonly fileService: FileService) {}

  @Post('create')
  create(@GetUserId() userId: string, @Body() createDto: CreateFileDto) {
    return this.fileService.createFile(userId, createDto);
  }
}
