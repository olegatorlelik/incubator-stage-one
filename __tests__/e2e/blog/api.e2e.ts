import app from '../../../src/app';
import { HTTP_STATUSES, RouterPaths } from '../../../src/constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import supertest from 'supertest';
import request from 'supertest';
import BlogTestManager from '../../utils/blog';
import { connect, disconnect } from '../../utils/mongo-db-memory-helper';

describe(RouterPaths.blogs, () => {
  const req: supertest.SuperTest<supertest.Test> = request(app);

  const blogTestManager = new BlogTestManager({
    request: req,
    defaultRouter: RouterPaths.blogs,
  });

  /**
   * Connect and clear database before start test
   */
  beforeAll(async () => {
    await connect();

    const res = await blogTestManager.clearData();

    expect(res.statusCode).toBe(HTTP_STATUSES.NO_CONTENT_204);
  });

  it('Should return empty array with success code', async () => {
    const response = await blogTestManager.getBlogs();

    expect(response.body).toStrictEqual([]);
  });

  it("Shouldn't create entity ( pass incorrect input date )", async () => {
    await blogTestManager.createBlog({
      statusCode: HTTP_STATUSES.BAD_REQUEST_400,
    });
  });

  it('Should create correct entity', async () => {
    await blogTestManager.createBlog({
      statusCode: HTTP_STATUSES.CREATED_201,
    });

    await blogTestManager.getBlogById();
  });

  it('Should return blog by id', async () => {
    await blogTestManager.getBlogById();
  });

  it("Shouldn't update entity id", async () => {
    await blogTestManager.updateBlog({
      statusCode: HTTP_STATUSES.BAD_REQUEST_400,
    });
  });

  it('Update entity by some key', async () => {
    await blogTestManager.updateBlog({
      statusCode: HTTP_STATUSES.NO_CONTENT_204,
    });
  });

  afterAll(async () => {
    await blogTestManager.clearData();
    await disconnect();
  });
});
