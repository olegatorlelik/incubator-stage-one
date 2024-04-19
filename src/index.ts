import app from './app';
import mongoose, { Error } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
  } catch (e) {
    console.log(`Error db:  ${(e as Error)?.message}`);
  }
  app.listen(port, () => console.log(`Example app listening port: ${port}`));
};

start();
