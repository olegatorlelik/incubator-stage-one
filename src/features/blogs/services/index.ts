import blogsModel from '../models';

class BlogService {
  /**
   * Custom validation for check existing blog by id
   */
  static checkExistingBlog = async (id: string): Promise<boolean> => {
    const result = await blogsModel.exists({ id });

    return Boolean(result);
  };
}

export default BlogService;
