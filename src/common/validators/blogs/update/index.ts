import { TValidateSchema } from '../../../../interfaces/i-validate-schema';
import { IBlogInputParams } from '../../../../features/blogs/models/input';

const update: TValidateSchema<IBlogInputParams> = {
  name: {
    isLength: { options: { min: 1, max: 15 } },
    errorMessage: 'Incorrect length ( must be from 1 to 15 symbols )',
  },
  description: { isLength: { options: { min: 1, max: 500 } } },
  websiteUrl: { isLength: { options: { min: 1, max: 100 } } },
};

export default update;
