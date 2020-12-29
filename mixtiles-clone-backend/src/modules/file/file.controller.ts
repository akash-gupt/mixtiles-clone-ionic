import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { GetUserId } from '../user/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { UPLOAD_PATH } from 'src/app.constants';
@Controller('files')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class FileController {
  constructor(public readonly fileService: FileService) {}

  @Post('create')
  create(@GetUserId() userId: string, @Body() createDto: CreateFileDto) {
    console.log(JSON.stringify(createDto));
    return this.fileService.createFile(userId, createDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_PATH,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file) {
    return file;
  }

  @Post('multiUpload')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: UPLOAD_PATH,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFiles(@UploadedFiles() files) {
    return files;
  }
}
