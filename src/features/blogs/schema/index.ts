import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const blogSchema = new Schema({
  id: { type: String, default: uuidv4(), required: true },
  name: { type: String, default: '', required: true },
  websiteUrl: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  createdAt: { type: String, default: new Date().toISOString() },
  isMembership: { type: Boolean, default: false },
});

export default blogSchema;
