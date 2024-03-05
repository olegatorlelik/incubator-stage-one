import TestManager, { IResponse, ITestManagerParams } from '../test-manager';
import { IVideoView } from '../../../src/features/videos/models/view';
import { AVAILABLE_RESOLUTIONS, HTTP_STATUSES } from '../../../src/constants';
import { IVideoUpdate } from '../../../src/features/videos/models/update';

interface IOptions {
  statusCode: HTTP_STATUSES;
}

class VideoTestManager extends TestManager<IVideoView> {
  /**
   * Constructor
   */
  constructor(params: ITestManagerParams) {
    super(params);

    this.entity = {
      id: 1,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date('2023-10-14T12:23:48.730Z'),
      publicationDate: new Date('2023-10-14T12:23:48.730Z'),
      availableResolutions: [AVAILABLE_RESOLUTIONS.P144],
    };
  }

  /**
   * Get video
   */
  public getVideos = async (): Promise<IResponse<IVideoView[]>> => {
    const response = await this.getEntities();

    expect(response.statusCode).toBe(HTTP_STATUSES.OK_200);

    return response;
  };

  /**
   * Create video flow
   */
  public createVideo = async (
    options: Partial<IOptions>
  ): Promise<IResponse<IVideoView>> => {
    const { statusCode } = options ?? {};

    // Incorrect body
    if (statusCode === HTTP_STATUSES.BAD_REQUEST_400) {
      const response = await this.createEntity({ author: 'test' });

      expect(response.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400);

      return response;
    }

    const createResponse = await this.createEntity({
      title: 'new test vide',
      author: 'new test author',
      availableResolutions: [AVAILABLE_RESOLUTIONS.P240],
    });

    await this.compareEntity(createResponse.body, 'id');

    return createResponse;
  };

  /**
   * Get video by id
   */
  public getVideoById = async () => {
    const { body, statusCode } = await this.getSingleEntity('id');

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(body).toStrictEqual(this.entity);
  };

  /**
   * Update video
   */
  public updateVideo = async ({ statusCode }: IOptions): Promise<void> => {
    // Check existence entity
    await this.getVideoById();

    if (statusCode === HTTP_STATUSES.BAD_REQUEST_400) {
      // Send 'tittle' insteadof ''title'
      const { statusCode: updateStatusCode } = await this.updateEntity(
        { tittle: 'sss' },
        'id'
      );

      expect(updateStatusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400);

      return;
    }

    const { statusCode: updateStatusCode } =
      await this.updateEntity<IVideoUpdate>(
        {
          title: 'New video title',
          publicationDate: new Date().toISOString(),
          minAgeRestriction: 2,
          canBeDownloaded: true,
          author: 'New Author',
          availableResolutions: [AVAILABLE_RESOLUTIONS.P240],
        },
        'id'
      );

    expect(updateStatusCode).toBe(HTTP_STATUSES.NO_CONTENT_204);
  };
}

export default VideoTestManager;
