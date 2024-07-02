import { IPostView } from './view';

export interface IPostInputParams
  extends Pick<
    IPostView,
    'title' | 'shortDescription' | 'content' | 'blogId'
  > {}
