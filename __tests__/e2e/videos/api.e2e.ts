import app from '../../../src/app';
import { HTTP_STATUSES, RouterPaths } from '../../../src/constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import supertest from 'supertest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import request from 'supertest';
import VideoTestManager from '../../utils/video';

describe(RouterPaths.videos, () => {
  const req: supertest.SuperTest<supertest.Test> = request(app);

  const videoTestManager = new VideoTestManager({
    request: req,
    defaultRouter: RouterPaths.videos,
  });

  beforeAll(async () => {
    const res = await videoTestManager.clearData();

    expect(res.statusCode).toBe(HTTP_STATUSES.NO_CONTENT_204);
  });

  it('Should return empty array with success code', async () => {
    const response = await videoTestManager.getVideos();

    expect(response.body).toStrictEqual([]);
  });

  it("Shouldn't create entity with incorrect input date", async () => {
    await videoTestManager.createVideo({
      statusCode: HTTP_STATUSES.BAD_REQUEST_400,
    });
  });

  it('Should create correct entity', async () => {
    await videoTestManager.createVideo({
      statusCode: HTTP_STATUSES.CREATED_201,
    });
  });

  it('Should return video by id', async () => {
    await videoTestManager.getVideoById();
  });

  it("Shouldn't update entity id", async () => {
    // Check existence entity
    await videoTestManager.updateVideo({
      statusCode: HTTP_STATUSES.BAD_REQUEST_400,
    });
  });

  it('Update entity by some key', async () => {
    await videoTestManager.updateVideo({ statusCode: HTTP_STATUSES.OK_200 });
  });
});
