import { ParamSchema } from 'express-validator';

export type TValidateSchema<T extends Record<string, any>> = Record<
  keyof T,
  ParamSchema
>;
