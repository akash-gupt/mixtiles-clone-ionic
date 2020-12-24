import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { UQ_USER_EMAIL, UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { ErrorMessage } from '@api/constants';
import { DatabaseErrors } from 'src/shared/errors';
import { LoginDto } from 'src/auth/models';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createAccount(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = this.userRepository.create();

    user.email = email;
    user.password = await this.hashPassword(password);

    try {
      const createdUser = await user.save();
      this.logger.debug(`User created ${JSON.stringify(createdUser)}`);
      return createdUser;
    } catch (err) {
      this.handleUniqueError(err);
    }
  }

  async validateUserPassword(
    authCredentialsDto: LoginDto,
  ): Promise<UserEntity> {
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

  private handleUniqueError(error) {
    const isUQError = DatabaseErrors.isUniqueConstraintViolation(error);
    if (isUQError) {
      const constraint = _.get(error, 'constraint');
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
