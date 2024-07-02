import { IPostView } from '../../../interfaces/entities/post/view';
import { IPostInputParams } from '../../../interfaces/entities/post/input';
import postModel from '../models';
import blogsModel from '../../blogs/models';

class PostRepository {
  /**
   * Get posts
   */
  public posts = async (): Promise<IPostView[]> => postModel.find();

  /**
   * Get single post by id
   */
  public getPostById = async (
    id: IPostView['id']
  ): Promise<IPostView | void> => {
    const result = await postModel.findOne({ id });

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

    return result.acknowledged;
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

    return postModel.create<IPostInputParams>({
      ...post,
      blogName: blog.name,
    });
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
