import { InferSchemaType } from 'mongoose';
import blogSchema from '../../../features/blogs/schema';

export interface IBlogView extends InferSchemaType<typeof blogSchema> {}
