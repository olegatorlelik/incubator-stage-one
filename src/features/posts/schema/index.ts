import { Schema } from 'mongoose';
import { models } from '../../../constants';

const { String } = Schema.Types;

const postSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  blogId: { type: String, ref: models.blogs, required: true },
  blogName: { type: String, required: true },
  createdAt: { type: String, default: new Date().toISOString() },
});

export default postSchema;
