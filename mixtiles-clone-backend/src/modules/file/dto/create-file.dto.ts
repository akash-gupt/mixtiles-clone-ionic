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
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @ApiProperty({ isArray: true })
  readonly fileNames: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly frameType: string;
}

export class FileDto {}
