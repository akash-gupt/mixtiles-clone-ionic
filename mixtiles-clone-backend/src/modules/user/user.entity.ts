import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { FileEntity } from '../file/file.entity';

export const UQ_USER_EMAIL = 'UQ_user_email';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index(UQ_USER_EMAIL, ['email'], { unique: true })
  @Column()
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 512 })
  @Exclude()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @OneToMany(
    () => FileEntity,
    file => file.user,
  )
  files: FileEntity[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
