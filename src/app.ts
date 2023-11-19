import express from 'express';
import globalErrorHandler from './common/middlewares/global-error-handler';
import videoRoutes from './features/videos/routes';
import { RouterPaths } from './constants';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.write('hello world');
  res.end();
});

app.use(RouterPaths.videos, videoRoutes);
app.use(globalErrorHandler);

export default app;
