import express from 'express';
import globalErrorHandler from './common/middlewares/global-error-handler';
import videoRoutes from './features/videos/routes';
import blogsRouter from './features/blogs/routes';
import postsRouter from './features/posts/routes';
import testingRoutes from './features/testing/routes';
import { RouterPaths } from './constants';
import inputValidationMiddleware from './common/middlewares/input-validation-middleware';
import handleCheckSchema from './common/middlewares/handle-check-schema';
import blogSchemas from './common/validators/blogs';
import postSchemas from './common/validators/post';
import basicAuth from './common/middlewares/basic-auth';

const app = express();

app.use(express.json());
app.use(basicAuth);

app.get('/', (req, res) => {
  res.write('hello world');
  res.end();
});

app.use(RouterPaths.videos, videoRoutes);
app.use(
  RouterPaths.blogs,
  handleCheckSchema(blogSchemas),
  inputValidationMiddleware,
  blogsRouter
);
app.use(
  RouterPaths.posts,
  handleCheckSchema(postSchemas),
  inputValidationMiddleware,
  postsRouter
);
app.use(RouterPaths.testing, testingRoutes);
app.use(globalErrorHandler);

export default app;
