import { TValidateSchema } from '../../../../interfaces/i-validate-schema';
import { IBlogInputParams } from '../../../../features/blogs/models/input';

const create: TValidateSchema<IBlogInputParams> = {
  name: {
    isLength: { options: { min: 1, max: 15 } },
    matches: {
      options:
        '/^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$\n/',
    },
  },
  description: { isLength: { options: { min: 1, max: 500 } } },
  websiteUrl: { isLength: { options: { min: 1, max: 100 } } },
};

export default create;
