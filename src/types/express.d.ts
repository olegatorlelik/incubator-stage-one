import { Request as ExpressRequest } from 'express';
import { TValidateSchema } from '../interfaces/i-validate-schema';

/**
 * Custom Request interface extending the default Express Request.
 *
 */
declare module 'express' {
  interface Request extends ExpressRequest {
    validationSchema?: TValidateSchema<any>;
  }
}
