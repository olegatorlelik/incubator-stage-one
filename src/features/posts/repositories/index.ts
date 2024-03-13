import db from '../../../db';
import { IPostView } from '../models/view';
import { IPostParamsInput } from '../models/input';
import { IBlogView } from '../../blogs/models/view';
import _ from 'lodash';

class PostRepository {
  /**
   * Get posts
   */
  public get posts(): IPostView[] {
    return db.getData('posts');
  }

  /**
   * Get blogs ( need to find blogName and create relation )
   */
  public get blogs(): IBlogView[] {
    return db.getData('blogs');
  }

  /**
   * Get single post by id
   */
  public getPostById = (postId: IPostView['id']): IPostView | void => {
    const postById = this.posts.find(({ id }) => id === postId);

    if (!postById) {
      return;
    }

    return postById;
  };

  /**
   * Remove post
   */
  public removePost = (id: IPostView['id']): void => {
    const updatedPost = this.posts.filter((post) => post.id !== id);

    db.updateData('posts', updatedPost);
  };

  /**
   * Adding new post
   */
  public addPost = (post: IPostParamsInput): IPostView | void => {
    const { name } = _.find(this.blogs, { id: post.blogId }) ?? {};

    if (!name) {
      return;
    }

    const newPost = {
      id: String(this.posts.length + 1),
      blogName: name,
      ...post,
    };

    db.updateData('posts', [...this.posts, newPost]);

    return newPost;
  };

  /**
   * Update post
   */
  public updatePost = (post: IPostView) => {
    db.updateData(
      'posts',
      this.posts.map((item) =>
        post.id === item.id ? { ...post, ...item } : item
      )
    );
  };
}

export default PostRepository;
