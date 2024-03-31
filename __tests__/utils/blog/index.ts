import TestManager, {
  IOptions,
  IResponse,
  ITestManagerParams,
} from '../test-manager';
import { HTTP_STATUSES, password, username } from '../../../src/constants';
import { IBlogView } from '../../../src/interfaces/entities/blog/view';
import { IBlogInputParams } from '../../../src/interfaces/entities/blog/input';

const updateTestTitleWebsiteUrl = 'https://www.example.com/path/to/page/update';

class BlogTestManager extends TestManager<IBlogView> {
  /**
   * Constructor
   */
  constructor(params: ITestManagerParams) {
    super(params);

    this.entity = {
      name: 'Test name',
      websiteUrl: 'https://www.example.com/path/to/page',
      description: 'test description',
    };
  }

  /**
   * Get blogs
   */
  public getBlogs = async (): Promise<IResponse<IBlogView[]>> => {
    const response = await this.getEntities();

    expect(response.statusCode).toBe(HTTP_STATUSES.OK_200);

    return response;
  };

  /**
   * Create blog
   */
  public createBlog = async (
    options: Partial<IOptions>
  ): Promise<IResponse<IBlogView>> => {
    const { statusCode } = options ?? {};

    // Incorrect body
    if (statusCode === HTTP_STATUSES.BAD_REQUEST_400) {
      const response = await this.createEntity({
        name: 'test test test test test test',
      });

      expect(response.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400);

      return response;
    }

    const createResponse = await this.createEntity({
      name: 'new t',
      description: 'new test description',
      websiteUrl: updateTestTitleWebsiteUrl,
    });

    await this.compareEntity(createResponse.body, 'id');

    return createResponse;
  };

  /**
   * Get blog by id
   */
  public getBlogById = async () => {
    const { body, statusCode } = await this.getSingleEntity('id');

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(body).toStrictEqual(this.entity);
  };

  /**
   * Update blog
   */
  public updateBlog = async ({ statusCode }: IOptions): Promise<void> => {
    // Check existence entity
    await this.getBlogs();

    if (statusCode === HTTP_STATUSES.BAD_REQUEST_400) {
      // Send wrong data
      const { statusCode: updateStatusCode } = await this.updateEntity(
        { tittle: 'sss' },
        'id'
      );

      expect(updateStatusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400);

      return;
    }

    const { statusCode: updateStatusCode } =
      await this.updateEntity<IBlogInputParams>(
        {
          name: 'name t',
          description: 'description test update',
          websiteUrl: updateTestTitleWebsiteUrl,
        },
        'id'
      );

    expect(updateStatusCode).toBe(HTTP_STATUSES.NO_CONTENT_204);
  };
}

export default BlogTestManager;
