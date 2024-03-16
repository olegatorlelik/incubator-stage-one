import { TValidateSchema } from '../../../../interfaces/i-validate-schema';
import { IPostParamsInput } from '../../../../features/posts/models/input';
import { IBlogView } from '../../../../features/blogs/models/view';
import db from '../../../../db';

/**
 * Custom validation for check existing blog by id
 */
const checkExistingBlog = (value: IBlogView['id']) =>
  db.getData('blogs').some(({ id }) => id === value);

const input: TValidateSchema<Omit<IPostParamsInput, 'blogName'>> = {
  title: {
    trim: true,
    isLength: { options: { min: 1, max: 30 } },
  },
  shortDescription: {
    trim: true,
    isLength: { options: { min: 1, max: 100 } },
  },
  content: {
    trim: true,
    isLength: { options: { min: 1, max: 1000 } },
  },
  blogId: {
    trim: true,
    custom: { options: checkExistingBlog },
  },
};

export default input;
