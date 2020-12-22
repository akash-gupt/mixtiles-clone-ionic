import {
  Injectable,
  ConflictException,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { UQ_USER_EMAIL, User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UserTokenService } from './user-token.service';
import { Repository } from 'typeorm';
import { generateOtp } from '@api/utils';
import { ErrorMessage } from '@api/constants';
import { DatabaseErrors } from 'src/shared/errors';

@Injectable()
export class UserService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersEmailService: UsersEmailService,
    private userTokenService: UserTokenService,
  ) {}

  async createAccount(createUserDto: CreateUserDto): Promise<void> {
    const { email, password } = createUserDto;

    const user = this.userRepository.create();
    const confirmationCode = generateOtp();

    user.email = email;
    user.password = await this.hashPassword(password);

    try {
      const createdUser = await user.save();
      this.logger.debug(`User created ${JSON.stringify(createdUser)}`);

      await this.usersEmailService.sendConfirmationCode(createdUser);
    } catch (err) {
      this.handleUniqueError(err);
    }
  }

  async validateUserPassword(authCredentialsDto: LoginDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      delete user.password;
      return user;
    }

    return null;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findByEmail(email: string): Promise<User | never> {
    const foundRecord = await this.userRepository.findOne({ email });
    if (!foundRecord) {
      throw new HttpException(
        ErrorMessage.userNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }
    return foundRecord;
  }

  private handleUniqueError(error) {
    const isUQError = DatabaseErrors.isUniqueConstraintViolation(error);
    if (isUQError) {
      const constraint = get(error, 'constraint');
      switch (constraint) {
        case UQ_USER_EMAIL:
          throw new HttpException(
            ErrorMessage.userEmailExists,
            HttpStatus.BAD_REQUEST,
          );
        default:
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new Error(error);
    }
  }
}
