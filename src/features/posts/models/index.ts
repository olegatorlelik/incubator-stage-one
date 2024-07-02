import { model } from 'mongoose';
import postSchema from '../schema';
import { IPostView } from '../../../interfaces/entities/post/view';
import { models } from '../../../constants';

const postModel = model<IPostView>(models.posts, postSchema);

export default postModel;
