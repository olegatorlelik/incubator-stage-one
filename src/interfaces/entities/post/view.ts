import { InferSchemaType } from 'mongoose';
import postSchema from '../../../features/posts/schema';

export interface IPostView extends InferSchemaType<typeof postSchema> {}
