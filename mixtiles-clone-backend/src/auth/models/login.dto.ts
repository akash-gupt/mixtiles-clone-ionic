import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak.',
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  remember: boolean;
}
