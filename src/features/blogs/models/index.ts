import { model } from 'mongoose';
import { IBlogView } from '../../../interfaces/entities/blog/view';
import blogSchema from '../schema';

const blogsModel = model<IBlogView>('blogs', blogSchema);

export default blogsModel;
