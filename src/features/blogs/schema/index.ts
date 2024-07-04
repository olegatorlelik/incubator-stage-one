import { Schema } from 'mongoose';

const blogSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, default: '', required: true },
  websiteUrl: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  createdAt: { type: String, default: new Date().toISOString() },
  isMembership: { type: Boolean, default: false },
});

export default blogSchema;
