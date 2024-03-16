import { TValidateSchema } from '../../../../interfaces/i-validate-schema';
import { IBlogInputParams } from '../../../../features/blogs/models/input';

const input: TValidateSchema<IBlogInputParams> = {
  name: {
    trim: true,
    isLength: { options: { min: 1, max: 15 } },
  },
  description: {
    trim: true,
    isLength: { options: { min: 1, max: 500 } },
  },
  websiteUrl: {
    trim: true,
    isLength: { options: { min: 1, max: 100 } },
    matches: {
      options:
        /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
    },
  },
};

export default input;
