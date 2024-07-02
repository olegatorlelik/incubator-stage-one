import app from './app';
import mongoose, { Error } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(
      // `mongodb+srv://olegatorlelik:${process.env.MONGO_DB_CLUSTER_PASSWORD}@it-incubator-blog-clast.jn1zxsp.mongodb.net/?retryWrites=true&w=majority&appName=it-incubator-blog-claster`
      // DJC9yASAkTmgcQgr
      `mongodb+srv://olegatorlelik:DJC9yASAkTmgcQgr@it-incubator-blog-clast.jn1zxsp.mongodb.net/?retryWrites=true&w=majority&appName=it-incubator-blog-claster`
    );
  } catch (e) {
    console.log(`Error db:  ${(e as Error)?.message}`);
  }
  app.listen(port, () => console.log(`Example app listening port: ${port}`));
};

start();
