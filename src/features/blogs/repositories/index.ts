import { IBlogView } from '../../../interfaces/entities/blog/view';
import blogsModel from '../models';
import postModel from '../../posts/models';
import { IBlogInputParams } from '../../../interfaces/entities/blog/input';

class BlogsRepository {
  /**
   * Get blogs
   */
  public blogs = async (): Promise<IBlogView[] | void> => blogsModel.find();

  /**
   * Get single blog by id
   */
  public getBlogById = async (
    blogId: IBlogView['id']
  ): Promise<IBlogView | void | null> => blogsModel.findOne({ id: blogId });

  /**
   * Remove blog
   */
  public removeBlog = async (id: IBlogView['id']): Promise<boolean> => {
    const [deleteBlogResult, existingPost] = await Promise.all([
      blogsModel.deleteOne({ id }),
      postModel.exists({ blogId: id }),
    ]);

    if (!deleteBlogResult.acknowledged) {
      return false;
    }

    if (existingPost) {
      await postModel.deleteMany({ blogId: id });
    }

    return true;
  };

  /**
   * Adding new blog
   */
  public addBlog = async (blog: IBlogInputParams): Promise<IBlogView> =>
    blogsModel.create<IBlogInputParams>(blog);

  /**
   * Update blog
   */
  public updateBlog = async (
    blog: IBlogInputParams,
    id: IBlogView['id']
  ): Promise<boolean> => {
    const [updateBlogResult, existingPost] = await Promise.all([
      blogsModel.updateOne({ id }, { $set: blog }),
      postModel.exists({ blogId: id }),
    ]);

    if (!updateBlogResult.acknowledged) {
      return false;
    }

    if (existingPost) {
      await postModel.updateMany({ blogId: id }, { blogName: blog.name });
    }

    return true;
  };
}

export default BlogsRepository;
