import { IBlogView } from './view';

export interface IBlogInputParams
  extends Omit<IBlogView, 'id' | 'isMembership' | 'createdAt'> {}
