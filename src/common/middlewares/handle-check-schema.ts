import { checkSchema } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { TValidateSchema } from '../../interfaces/i-validate-schema';

const handleCheckSchema =
  (schemas: Record<Request['method'], TValidateSchema<any>>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const schema = schemas[req?.method];

    if (!schema) {
      next();

      return;
    }

    await checkSchema(schema).run(req);

    next();
  };

export default handleCheckSchema;
