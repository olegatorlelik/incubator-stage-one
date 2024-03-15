import { Request, Response, Router } from 'express';
import BlogsRepository from '../repositories';
import { HTTP_STATUSES } from '../../../constants';
import { IBlogView } from '../models/view';
import { TUriParams } from '../../../interfaces/i-uri-params';
import { IBlogInputParams } from '../models/input';

const router = Router();
const blogsRepository = new BlogsRepository();

/**
 * Get all blogs
 */
router.get('/', (_, res: Response<IBlogView[]>) => {
  res.status(HTTP_STATUSES.OK_200).send(blogsRepository.blogs);
});

/**
 * Get blog by id
 */
router.get(
  '/:id',
  (req: Request<TUriParams>, res: Response<IBlogView | number>) => {
    const { params } = req;

    const blog = blogsRepository.getBlogById(params?.id);

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
  (req: Request<never, IBlogInputParams>, res: Response<IBlogView>) => {
    const blog = blogsRepository.addBlog(req.body);

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
  (req: Request<TUriParams, IBlogInputParams>, res: Response<IBlogView>) => {
    const { params, body } = req;

    const blog = blogsRepository.getBlogById(params?.id);

    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

      return;
    }

    blogsRepository.updateBlog({ ...blog, ...body });

    res.status(HTTP_STATUSES.NO_CONTENT_204).send();
  }
);

/**
 * Delete blog by id
 */
router.delete('/:id', (req: Request<TUriParams>, res) => {
  const { params } = req;

  const blog = blogsRepository.getBlogById(params?.id);

  if (!blog) {
    res.status(HTTP_STATUSES.NOT_FOUND_404).send();

    return;
  }

  blogsRepository.removeBlog(blog.id);

  res.status(HTTP_STATUSES.NO_CONTENT_204).send();
});

export default router;
