import { IErrorField } from '../../interfaces';
import { ValidationError } from 'express-validator/src/base';

/**
 * Generate error array for custom error middleware
 */
const generateErrors = (inputErrors: ValidationError[]): IErrorField[] => {
  return inputErrors.map(({ msg, ...value }) => {
    if ('path' in value) {
      return {
        message: msg,
        field: value.path,
      };
    }

    if ('fields' in value) {
      const [field] = value.fields;

      return {
        message: `Unknown field ${field?.path} in ${field?.location} with value ${field?.value}`,
        field: field.value,
      };
    }

    return [];
  }) as IErrorField[];
};
export default generateErrors;
