import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak.',
  })
  @ApiProperty({ required: true, minLength: 8, maxLength: 20 })
  password: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
