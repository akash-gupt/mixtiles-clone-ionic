import { Expose ,TransformPlainToClass, Exclude} from 'class-transformer';

@Expose()
export class SignUpVm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;

  @Exclude()
  password: string;
}
