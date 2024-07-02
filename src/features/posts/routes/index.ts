import { Request, Response, Router } from 'express';
import { HTTP_STATUSES } from '../../../constants';
import { TUriParams } from '../../../interfaces/i-uri-params';
import PostRepository from '../repositories';
import { IPostView } from '../../../interfaces/entities/post/view';
import { IPostInputParams } from '../../../interfaces/entities/post/input';

const router = Router();
const postRepository = new PostRepository();

/**
 * Get all posts
 */
router.get('/', async (_, res: Response<IPostView[]>) => {
  const posts = await postRepository.posts();

  res.status(HTTP_STATUSES.OK_200).send(posts);
});

/**
 * Get post by id
 */
router.get(
  '/:id',
  async (req: Request<TUriParams>, res: Response<IPostView | number>) => {
    const { params } = req;
    const post = await postRepository.getPostById(params?.id);

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    res.status(HTTP_STATUSES.OK_200).send(post);
  }
);

/**
 * Create new post
 */
router.post(
  '/',
  async (
    req: Request<never, never, IPostInputParams>,
    res: Response<IPostView>
  ) => {
    const post = await postRepository.addPost(req.body);

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    res.status(HTTP_STATUSES.CREATED_201).send(post);
  }
);

/**
 * Update post by id
 */
router.put(
  '/:id',
  async (
    req: Request<TUriParams, never, IPostInputParams>,
    res: Response<IPostView>
  ) => {
    const { params, body } = req;
    const isSuccess = await postRepository.updatePost(body, params?.id);

    if (!isSuccess) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400).send();

      return;
    }

    res.status(HTTP_STATUSES.NO_CONTENT_204).send();
  }
);

/**
 * Delete post by id
 */
router.delete('/:id', async (req: Request<TUriParams>, res) => {
  const { params } = req;
  const isSuccess = await postRepository.removePost(params?.id);

  if (!isSuccess) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send();

    return;
  }

  res.status(HTTP_STATUSES.NO_CONTENT_204).send();
});

export default router;
