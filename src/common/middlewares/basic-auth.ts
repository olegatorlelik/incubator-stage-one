import { Response, Request, NextFunction } from 'express';
import auth from 'basic-auth';
import { HTTP_STATUSES } from '../../constants';

const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.method === 'GET' ||
    (req.url.includes('testing') && req.method === 'DELETE')
  ) {
    next();

    return;
  }

  const username = 'admin';
  const password = 'qwerty';

  const user = auth(req);

  if (user && user.name === username && user.pass === password) {
    next();

    return;
  }

  res.statusCode = HTTP_STATUSES.UNAUTHORIZED;
  res.end();
};

export default basicAuth;
