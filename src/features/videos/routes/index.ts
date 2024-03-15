import { Request, Response, Router } from 'express';
import { IVideoView } from '../models/view';
import { HTTP_STATUSES } from '../../../constants';
import { TVideoUriParams } from '../models/uri-params';
import { IVideoCreate } from '../models/create';
import { IVideoUpdate } from '../models/update';
import VideoRepository from '../repositories';
import CustomError from '../../../common/services/custom-error';
import createVideoValidation from '../../../common/validators/video/create';
import updateVideoValidation from '../../../common/validators/video/update';

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
  (req: Request<TVideoUriParams>, res: Response<IVideoView | number>) => {
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
  (req: Request<never, IVideoCreate, never>, res: Response<IVideoView>) => {
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
    req: Request<TVideoUriParams, unknown, IVideoUpdate>,
    res: Response<IVideoView>
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

    res.status(HTTP_STATUSES.NO_CONTENT_204).send();
  }
);

/**
 * Delete video by id
 */
router.delete('/:id', (req: Request<TVideoUriParams>, res) => {
  const { params } = req;

  const video = videoRepository.getVideoById(params?.id);

  if (!video) {
    res.status(HTTP_STATUSES.NOT_FOUND_404).send();

    return;
  }

  videoRepository.removeVideoById(video.id.toString());

  res.status(HTTP_STATUSES.NO_CONTENT_204).send();
});

export default router;
