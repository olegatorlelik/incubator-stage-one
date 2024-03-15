import app from '../../../src/app';
import { HTTP_STATUSES, RouterPaths } from '../../../src/constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import supertest from 'supertest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import request from 'supertest';
import PostTestManager from '../../utils/post';

describe(RouterPaths.posts, () => {
  const req: supertest.SuperTest<supertest.Test> = request(app);

  const postTestManager = new PostTestManager({
    request: req,
    defaultRouter: RouterPaths.posts,
  });

  beforeAll(async () => {
    const res = await postTestManager.clearData();

    expect(res.statusCode).toBe(HTTP_STATUSES.NO_CONTENT_204);
  });

  it('Should return empty array with success code', async () => {
    const response = await postTestManager.getPosts();

    expect(response.body).toStrictEqual([]);
  });

  it("Shouldn't create entity ( pass incorrect input date )", async () => {
    await postTestManager.createPost({
      statusCode: HTTP_STATUSES.BAD_REQUEST_400,
    });
  });

  it('Should create correct entity', async () => {
    await postTestManager.createPost({
      statusCode: HTTP_STATUSES.CREATED_201,
    });

    await postTestManager.getPostById();
  });

  it('Should return video by id', async () => {
    await postTestManager.getPostById();
  });

  it("Shouldn't update entity id", async () => {
    await postTestManager.updatePost({
      statusCode: HTTP_STATUSES.BAD_REQUEST_400,
    });
  });

  it('Update entity by some key', async () => {
    await postTestManager.updatePost({
      statusCode: HTTP_STATUSES.NO_CONTENT_204,
    });
  });
});
