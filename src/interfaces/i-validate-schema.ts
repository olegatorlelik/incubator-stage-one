import { ParamSchema } from 'express-validator/src/middlewares/schema';

export type TValidateSchema<T extends Record<string, any>> = Record<
  keyof T,
  ParamSchema
>;
