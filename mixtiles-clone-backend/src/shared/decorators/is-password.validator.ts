import { registerDecorator, ValidationOptions } from 'class-validator';

const PASSWORD_REGEX = '';

export function IsPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isPassword',
      target: object.constructor,
      constraints: [],
      options: {
        message:
          ' Password should be between 8 to 30 characters and should be alphanumeric with one special character!',
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          return new RegExp(PASSWORD_REGEX).test(value);
        },
      },
    });
  };
}
