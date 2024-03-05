import { IErrorField } from '../../interfaces';
import { ValidationError } from 'express-validator/src/base';

/**
 * Generate error array for custom error middleware
 */
const generateErrors = (inputErrors: ValidationError[]): IErrorField[] =>
  inputErrors.map(({ msg, ...value }) => {
    if (!('path' in value)) {
      return;
    }

    return {
      message: msg,
      field: value.path,
    };
  }) as IErrorField[];

export default generateErrors;
