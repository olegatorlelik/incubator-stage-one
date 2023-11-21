import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUSES } from '../../constants';
import CustomError from '../services/custom-error';

/**
 * Handle errors and check instance
 */
const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    res
      .status(error.statusCode ?? HTTP_STATUSES.NOT_FOUND_404)
      .send({ errorsMessages: error?.getSerializedErrors });

    return;
  }

  res
    .status(HTTP_STATUSES.NOT_FOUND_404)
    .send({ errors: [{ message: 'Some error has occurred' }] });
};

export default globalErrorHandler;
