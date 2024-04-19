import { TValidateSchema } from '../../../../interfaces/i-validate-schema';
import { IPostInputParams } from '../../../../interfaces/entities/post/input';
import PostRepository from '../../repositories';

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
    custom: { options: PostRepository.checkExistingBlog },
  },
};

export default input;
