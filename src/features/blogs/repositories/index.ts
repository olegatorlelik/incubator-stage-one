import { IBlogView } from '../models/view';
import db from '../../../db';
import { IBlogInputParams } from '../models/input';
import _ from 'lodash';
import { IPostView } from '../../posts/models/view';

class BlogsRepository {
  /**
   * Get blogs
   */
  public get blogs(): IBlogView[] {
    return db.getData('blogs');
  }

  /**
   * Get post ( needed in case when blog name was changed )
   */
  public get posts(): IPostView[] {
    return db.getData('posts');
  }

  /**
   * Get single blog by id
   */
  public getBlogById = (blogId: IBlogView['id']): IBlogView | void => {
    const blogById = this.blogs.find(({ id }) => id === blogId);

    if (!blogById) {
      return;
    }

    return blogById;
  };

  /**
   * Remove blog
   */
  public removeBlog = (id: IBlogView['id']): void => {
    const updatedBlogs = this.blogs.filter((blog) => blog.id !== id);

    db.updateData('blogs', updatedBlogs);
  };

  /**
   * Adding new blog
   */
  public addBlog = (blog: IBlogInputParams): IBlogView => {
    const newBlog = {
      id: String(this.blogs.length + 1),
      ...blog,
    };

    db.updateData('blogs', [...this.blogs, newBlog]);

    return newBlog;
  };

  /**
   * Update blog
   */
  public updateBlog = (blog: IBlogView) => {
    const { name } = _.find(this.blogs, { id: blog.id }) ?? {};
    const { name: updateBlogName } = blog ?? {};

    // Check if name of blog was changed we have to update posts
    if (name && name !== updateBlogName) {
      db.updateData(
        'posts',
        this.posts.map((post) =>
          post.blogId === blog.id
            ? {
                ...post,
                blogName: updateBlogName,
              }
            : post
        )
      );
    }

    db.updateData(
      'blogs',
      this.blogs.map((item) =>
        blog.id === item.id ? { ...item, ...blog } : item
      )
    );
  };
}

export default BlogsRepository;
