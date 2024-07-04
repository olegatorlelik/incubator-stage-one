import { IBlogView } from '../../../interfaces/entities/blog/view';
import blogsModel from '../models';
import postModel from '../../posts/models';
import { IBlogInputParams } from '../../../interfaces/entities/blog/input';
import MongoFieldWorker from '../../../common/services/mongo-field-worker';

type TDocument = InstanceType<typeof blogsModel>;

class BlogsRepository extends MongoFieldWorker<IBlogView, TDocument> {
  /**
   * Get blogs
   */
  public blogs = async (): Promise<IBlogView[] | void> => {
    return blogsModel.find().select(this.unnecessaryFields);
  };

  /**
   * Get single blog by id
   */
  public getBlogById = async (blogId: IBlogView['id']): Promise<IBlogView> =>
    blogsModel.findOne({ id: blogId }).select(this.unnecessaryFields);

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

    if (!existingPost) {
      return false;
    }

    const result = await postModel.deleteMany({ blogId: id });

    return result.acknowledged && result?.deletedCount !== 0;
  };

  /**
   * Adding new blog
   */
  public addBlog = async (
    blog: IBlogInputParams
  ): Promise<IBlogView | void> => {
    const result = await blogsModel.create<IBlogInputParams>(blog);

    if (!result) {
      return;
    }

    return this.pickFields(result);
  };

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
