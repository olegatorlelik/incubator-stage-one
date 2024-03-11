import { IPostView } from './view';

export interface IPostParamsInput extends Omit<IPostView, 'id'> {}
