import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../services/custom-error';
import generateErrors from '../helpers/generate-errors';
import { HTTP_STATUSES } from '../../constants';

const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();

    return;
  }

  const errors = generateErrors(result.array({ onlyFirstError: true }));

  throw new CustomError('error', {
    statusCode: HTTP_STATUSES.BAD_REQUEST_400,
    errors,
  });
};

export default inputValidationMiddleware;
