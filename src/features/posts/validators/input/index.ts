import { TValidateSchema } from '../../../../interfaces/i-validate-schema';
import { IPostInputParams } from '../../../../interfaces/entities/post/input';
import BlogService from '../../../blogs/services';
import CustomError from '../../../../common/services/custom-error';
import { HTTP_STATUSES } from '../../../../constants';

const input: TValidateSchema<Omit<IPostInputParams, 'blogName'>> = {
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
    custom: {
      options: async (id: string) => {
        const isExist = await BlogService.checkExistingBlog(id);

        if (!isExist) {
          throw new CustomError('error', {
            statusCode: HTTP_STATUSES.BAD_REQUEST_400,
            errors: [{ message: 'Incorrect blog id', field: 'blogId' }],
          });
        }

        return true;
      },
    },
  },
};

export default input;
