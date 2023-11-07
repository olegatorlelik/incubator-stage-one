import { Query } from 'express-serve-static-core';
import type { Request } from 'express';
import * as core from 'express-serve-static-core';

export interface TTypedRequest<TQ extends Query, TB, TP extends object>
  extends Request<TP> {
  query: TQ;
  body: TB;
}

export interface TTypedRequestParams<TP extends core.ParamsDictionary>
  extends Request {
  params: TP;
}

export type TKey<TEntity> = keyof TEntity;
