import { Request, Response, Router } from 'express';
import BlogsRepository from '../repositories';
import { HTTP_STATUSES } from '../../../constants';
import { IBlogView } from '../../../interfaces/entities/blog/view';
import { TUriParams } from '../../../interfaces/i-uri-params';
import { IBlogInputParams } from '../../../interfaces/entities/blog/input';

const router = Router();
const blogsRepository = new BlogsRepository();

/**
 * Get all blogs
 */
router.get('/', async (_, res: Response<IBlogView[]>) => {
  const blogs = await blogsRepository.blogs();

  if (!blogs) {
    res.status(HTTP_STATUSES.NO_CONTENT_204).send();

    return;
  }

  res.status(HTTP_STATUSES.OK_200).send(blogs);
});

/**
 * Get blog by id
 */
router.get(
  '/:id',
  async (req: Request<TUriParams>, res: Response<IBlogView | number>) => {
    const { params } = req;
    const blog = await blogsRepository.getBlogById(params?.id);

    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    res.status(HTTP_STATUSES.OK_200).send(blog);
  }
);

/**
 * Create new blog
 */
router.post(
  '/',
  async (req: Request<never, IBlogInputParams>, res: Response<IBlogView>) => {
    const blog = await blogsRepository.addBlog(req.body);

    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    res.status(HTTP_STATUSES.CREATED_201).send(blog);
  }
);

/**
 * Update blog by id
 */
router.put(
  '/:id',
  async (
    req: Request<TUriParams, IBlogInputParams>,
    res: Response<IBlogView>
  ) => {
    const { params, body } = req;
    const isSuccess = await blogsRepository.updateBlog(body, params?.id);

    if (!isSuccess) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    res.status(HTTP_STATUSES.NO_CONTENT_204).send();
  }
);

/**
 * Delete blog by id
 */
router.delete('/:id', async (req: Request<TUriParams>, res) => {
  const { params } = req;
  const isSuccess = await blogsRepository.removeBlog(params?.id);

  if (!isSuccess) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

    return;
  }

  res.status(HTTP_STATUSES.NO_CONTENT_204).send();
});

export default router;
