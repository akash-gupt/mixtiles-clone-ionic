import { IsDefined, ValidationOptions } from 'class-validator';

const defaultOption = { message: '$property is required' };

export const IsRequired = (
  validationOptions: ValidationOptions = defaultOption
) => IsDefined(validationOptions);
