import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateFileDto {
  @IsDefined()
  readonly fileNames: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly frameType: string;
}

export class FileDto {}
