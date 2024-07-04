import { IPostView } from '../../../interfaces/entities/post/view';
import { IPostInputParams } from '../../../interfaces/entities/post/input';
import postModel from '../models';
import blogsModel from '../../blogs/models';
import MongoFieldWorker from '../../../common/services/mongo-field-worker';

type TDocumentPost = InstanceType<typeof postModel>;

class PostRepository extends MongoFieldWorker<IPostView, TDocumentPost> {
  /**
   * Get posts
   */
  public posts = async (): Promise<IPostView[]> =>
    postModel.find().select(this.unnecessaryFields);

  /**
   * Get single post by id
   */
  public getPostById = async (
    id: IPostView['id']
  ): Promise<IPostView | void> => {
    const result = await postModel
      .findOne({ id })
      .select(this.unnecessaryFields);

    if (!result) {
      return;
    }

    return result;
  };

  /**
   * Remove post
   */
  public removePost = async (id: IPostView['id']): Promise<boolean> => {
    const result = await postModel.deleteOne({ id });

    return result.acknowledged && result.deletedCount !== 0;
  };

  /**
   * Adding new post
   */
  public addPost = async (
    post: IPostInputParams
  ): Promise<IPostView | void> => {
    const blog = await blogsModel.findOne({ id: post?.blogId });

    if (!blog) {
      return;
    }

    const posts = await postModel.create<IPostInputParams>({
      ...post,
      blogName: blog.name,
    });

    if (!posts) {
      return;
    }

    return this.pickFields(posts);
  };

  /**
   * Update post
   */
  public updatePost = async (
    post: IPostInputParams,
    id: IPostView['id']
  ): Promise<boolean> => {
    const result = await postModel.updateOne<IPostInputParams>(
      { id },
      { $set: post }
    );

    return result.acknowledged;
  };
}

export default PostRepository;
