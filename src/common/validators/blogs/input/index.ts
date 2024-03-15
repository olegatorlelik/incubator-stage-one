import { TValidateSchema } from '../../../../interfaces/i-validate-schema';
import { IBlogInputParams } from '../../../../features/blogs/models/input';

const input: TValidateSchema<IBlogInputParams> = {
  name: {
    isLength: { options: { min: 1, max: 15 } },
  },
  description: { isLength: { options: { min: 1, max: 500 } } },
  websiteUrl: {
    isLength: { options: { min: 1, max: 100 } },
    matches: {
      options:
        /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
    },
  },
};

export default input;
