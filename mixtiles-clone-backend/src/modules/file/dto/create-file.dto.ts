import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFileDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly pageName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly followerCount: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly followingCount: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly fullName?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly isPrivate?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly profilePicUrl?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly isVerified?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly biography?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly isBusiness?: boolean;
}
