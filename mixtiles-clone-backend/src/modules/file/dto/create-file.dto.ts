import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateFileDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly file: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly frameType: string;
}
