import { Request, Response, Router } from 'express';
import { IVideoView } from '../models/view';
import { HTTP_STATUSES } from '../../../constants';
import { TTypedRequest, TTypedRequestParams } from '../../../types';
import { TVideoUriParams } from '../models/uri-params';
import { IVideoCreate } from '../models/create';
import { IVideoUpdate } from '../models/update';
import updateVideoValidation from '../../../common/helpers/update-video-validation';
import VideoRepository from '../repositories';
import createVideoValidation from '../../../common/helpers/create-video-validation';
import CustomError from '../../../common/services/custom-error';

const router = Router();
const videoRepository = new VideoRepository();

/**
 * Get all videos
 */
router.get('/', (req: Request, res: Response<IVideoView[]>) =>
  res.status(HTTP_STATUSES.OK_200).send(videoRepository.getVideos)
);

/**
 * Get video by id
 */
router.get(
  '/:id',
  (
    req: TTypedRequestParams<TVideoUriParams>,
    res: Response<IVideoView | number>
  ) => {
    const { params } = req;

    const video = videoRepository.getVideoById(params?.id);

    if (!video) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    res.status(HTTP_STATUSES.OK_200).send(video);
  }
);

/**
 * Create new video
 */
router.post(
  '/',
  (
    req: TTypedRequest<never, IVideoCreate, never>,
    res: Response<IVideoView>
  ) => {
    const errors = createVideoValidation(req.body);

    if (errors?.length !== 0) {
      throw new CustomError('Creat error', {
        errors,
        statusCode: HTTP_STATUSES.BAD_REQUEST_400,
      });
    }

    const video = videoRepository.createVideo(req.body);

    if (!video) {
      return;
    }

    res.status(HTTP_STATUSES.CREATED_201).send(video);
  }
);

/**
 * Update video by id
 */
router.put(
  '/:id',
  (
    req: TTypedRequest<never, IVideoUpdate, TVideoUriParams>,
    res: Response<IVideoView | number>
  ) => {
    const { params, body } = req;

    const video = videoRepository.getVideoById(params?.id);

    if (!video) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    const errors = updateVideoValidation(body) ?? {};

    if (errors.length !== 0) {
      throw new CustomError('Some error', {
        errors,
        statusCode: HTTP_STATUSES.BAD_REQUEST_400,
      });
    }

    const updatedVideo = { ...video, ...body };

    videoRepository.updateVideo(updatedVideo);

    res.status(HTTP_STATUSES.OK_200).send(updatedVideo);
  }
);

/**
 * Delete video by id
 */
router.delete('/:id', (req: TTypedRequestParams<TVideoUriParams>, res) => {
  const { params } = req;

  const video = videoRepository.getVideoById(params?.id);

  if (!video) {
    new CustomError('Delete error', {
      statusCode: HTTP_STATUSES.NO_CONTENT_204,
    });

    return;
  }

  videoRepository.removeVideoById(video.id.toString());

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

/**
 * Clear all videos from db
 */
router.delete('/testing/all-data', (req, res) => {
  videoRepository.clearVideoStore();

  res
    .status(HTTP_STATUSES.NO_CONTENT_204)
    .send({ message: 'Data was cleared successfully' });
});

export default router;
