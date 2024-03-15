import { Request, Response, Router } from 'express';
import { HTTP_STATUSES } from '../../../constants';
import { TUriParams } from '../../../interfaces/i-uri-params';
import PostRepository from '../repositories';
import { IPostView } from '../models/view';
import { IPostParamsInput } from '../models/input';

const router = Router();
const postRepository = new PostRepository();

/**
 * Get all posts
 */
router.get('/', (_, res: Response<IPostView[]>) => {
  res.status(HTTP_STATUSES.OK_200).send(postRepository.posts);
});

/**
 * Get post by id
 */
router.get(
  '/:id',
  (req: Request<TUriParams>, res: Response<IPostView | number>) => {
    const { params } = req;

    const post = postRepository.getPostById(params?.id);

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
  (req: Request<never, IPostParamsInput>, res: Response<IPostView>) => {
    const post = postRepository.addPost(req.body);

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
  (req: Request<TUriParams, IPostParamsInput>, res: Response<IPostView>) => {
    const { params, body } = req;

    const post = postRepository.getPostById(params?.id);

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    postRepository.updatePost({ ...post, ...body });

    res.status(HTTP_STATUSES.NO_CONTENT_204).send();
  }
);

/**
 * Delete post by id
 */
router.delete('/:id', (req: Request<TUriParams>, res) => {
  const { params } = req;

  const post = postRepository.getPostById(params?.id);

  if (!post) {
    res.status(HTTP_STATUSES.NOT_FOUND_404).send();

    return;
  }

  postRepository.removePost(post.id);

  res.status(HTTP_STATUSES.NO_CONTENT_204).send();
});

export default router;
