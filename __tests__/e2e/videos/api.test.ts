import app from '../../../src/app';
import {
  AVAILABLE_RESOLUTIONS,
  HTTP_STATUSES,
  RouterPaths,
} from '../../../src/constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import request from 'supertest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import supertest from 'supertest';
import TestManager from '../utils/test-manager';
import { IVideoView } from '../../../src/features/videos/models/view';
import { IVideoUpdate } from '../../../src/features/videos/models/update';

describe(RouterPaths.videos, () => {
  const req: supertest.SuperTest<supertest.Test> = request(app);

  const testManager = new TestManager<IVideoView>(req, {
    defaultRouter: RouterPaths.videos,
    entity: {
      id: 1,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date('2023-10-14T12:23:48.730Z'),
      publicationDate: new Date('2023-10-14T12:23:48.730Z'),
      availableResolutions: [AVAILABLE_RESOLUTIONS.P144],
    },
  });

  /**
   * Clear all video data
   */
  beforeAll(async () => {
    const res = await testManager.clearData();

    expect(res.statusCode).toBe(HTTP_STATUSES.NO_CONTENT_204);
  });

  /**
   * Get empty array
   */
  it('Should return empty array', async () => {
    const { statusCode, body } = await testManager.getEntities();

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(body).toStrictEqual([]);
  });

  /**
   * Try to create video with incorrect body
   */
  it("Shouldn't create video", async () => {
    const response = await testManager.createEntity({ wrongBody: {} });

    expect(response.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400);

    const { body, statusCode } = await testManager.getEntities();

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(body).toStrictEqual([]);
  });

  /**
   * Try to create video
   */
  it('Should create correct video', async () => {
    const { body, statusCode } = await testManager.createEntity({
      entityKeys: ['title', 'author', 'availableResolutions'],
    });

    expect(statusCode).toBe(HTTP_STATUSES.CREATED_201);

    const { body: viewBody, statusCode: viewStatusCode } =
      await testManager.getSingleEntity('id');

    expect(viewStatusCode).toBe(HTTP_STATUSES.OK_200);
    expect(viewBody).toStrictEqual(body);
  });

  /**
   * Try to get video by id
   */
  it('Should return video by id', async () => {
    const { body, statusCode } = await testManager.getSingleEntity('id');

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(body).toStrictEqual(body);
  });

  /**
   * Try to update with incorrect body
   */
  it("Shouldn't update video id", async () => {
    // Check existence video
    const { statusCode, body } = await testManager.getSingleEntity('id');

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(body).toStrictEqual(testManager.entity);

    // Send 'tittle' insteadof ''title'
    const { statusCode: updateStatusCode } = await testManager.updateEntity(
      { tittle: 'sss' },
      'id'
    );

    expect(updateStatusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400);
  });

  /**
   * Try to update video
   */
  it('Update video id', async () => {
    // Check existence video
    const { statusCode, body } = await testManager.getSingleEntity('id');

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(body).toStrictEqual(testManager.entity);

    const { statusCode: updateStatusCode, body: updatedBody } =
      await testManager.updateEntity<IVideoUpdate>(
        {
          title: 'New video title',
          publicationDate: new Date(),
          minAgeRestriction: 2,
          canBeDownloaded: true,
          author: 'New Author',
          availableResolutions: [AVAILABLE_RESOLUTIONS.P240],
        },
        'id'
      );

    expect(updateStatusCode).toBe(HTTP_STATUSES.OK_200);
    expect(updatedBody).toStrictEqual(testManager.entity);
  });
});
