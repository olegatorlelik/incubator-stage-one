import TestManager, {
  IOptions,
  IResponse,
  ITestManagerParams,
} from '../test-manager';
import { HTTP_STATUSES, RouterPaths } from '../../../src/constants';
import { ClassReturnType } from '../../../src/types/class-return-type';
import BlogTestManager from '../blog';
import { IPostView } from '../../../src/interfaces/entities/post/view';
import { IPostInputParams } from '../../../src/interfaces/entities/post/input';

class PostTestManager extends TestManager<IPostView> {
  /**
   * Blog test manager
   */
  protected readonly blogTestManager: ClassReturnType<typeof BlogTestManager>;

  /**
   * Constructor
   */
  constructor(params: ITestManagerParams) {
    super(params);

    this.blogTestManager = new BlogTestManager({
      request: params.request,
      defaultRouter: RouterPaths.blogs,
    });

    const { id, name } = this.blogTestManager.entity;

    this.entity = {
      id: 'post1',
      blogId: id,
      blogName: name,
      title: 'testTitle',
      content: 'test content',
      shortDescription: 'test shortDescription',
    };
  }

  /**
   * Get posts
   */
  public getPosts = async (): Promise<IResponse<IPostView[]>> => {
    const response = await this.getEntities();

    expect(response.statusCode).toBe(HTTP_STATUSES.OK_200);

    return response;
  };

  /**
   * Create post
   */
  public createPost = async (
    options: Partial<IOptions>
  ): Promise<IResponse<IPostView>> => {
    const { statusCode } = options ?? {};

    // Incorrect body
    if (statusCode === HTTP_STATUSES.BAD_REQUEST_400) {
      const response = await this.createEntity({
        title: 'test test test test test test',
      });

      expect(response.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400);

      return response;
    }

    const createBlogResponse = await this.blogTestManager.createBlog({
      statusCode: HTTP_STATUSES.CREATED_201,
    });

    const { id } = createBlogResponse.body ?? {};

    const createResponse = await this.createEntity({
      title: 'new test post',
      content: 'new test content',
      shortDescription: 'new short description',
      blogId: id,
    });

    await this.compareEntity(createResponse.body, 'id');

    return createResponse;
  };

  /**
   * Get post by id
   */
  public getPostById = async () => {
    const { body, statusCode } = await this.getSingleEntity('id');

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(body).toStrictEqual(this.entity);
  };

  /**
   * Update post
   */
  public updatePost = async ({ statusCode }: IOptions): Promise<void> => {
    // Check existence entity
    await this.getPosts();

    if (statusCode === HTTP_STATUSES.BAD_REQUEST_400) {
      // Send wrong data
      const { statusCode: updateStatusCode } = await this.updateEntity(
        { title: 'sss' },
        'id'
      );

      expect(updateStatusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400);

      return;
    }

    // Here we try to get blog and set one if get was success
    this.blogTestManager.getBlogById();

    const { id } = this.blogTestManager.entity;

    const { statusCode: updateStatusCode } =
      await this.updateEntity<IPostInputParams>(
        {
          title: 'update title',
          content: 'content test update',
          blogId: id,
          shortDescription: 'Update shortDescription',
        },
        'id'
      );

    expect(updateStatusCode).toBe(HTTP_STATUSES.NO_CONTENT_204);
  };
}

export default PostTestManager;
