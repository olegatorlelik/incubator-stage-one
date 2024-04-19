import { model } from 'mongoose';
import postSchema from '../schema';
import { IPostView } from '../../../interfaces/entities/post/view';

const postModel = model<IPostView>('posts', postSchema);

export default postModel;
