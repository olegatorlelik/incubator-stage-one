import { IBlogView } from '../models/view';
import db from '../../../db';
import { IBlogInputParams } from '../models/input';

class BlogsRepository {
  /**
   * Get blogs
   */
  public get blogs(): IBlogView[] {
    return db.getData('blogs');
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
    db.updateData(
      'blogs',
      this.blogs.map((item) =>
        blog.id === item.id ? { ...blog, ...item } : item
      )
    );
  };
}

export default BlogsRepository;
