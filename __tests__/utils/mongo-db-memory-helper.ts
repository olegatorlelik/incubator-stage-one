import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoDb: MongoMemoryServer;

const connect = async () => {
  mongoDb = await MongoMemoryServer.create();

  const uri = mongoDb.getUri();

  await mongoose.connect(uri);
};

const disconnect = async () => {
  await mongoose.disconnect();
  await mongoDb.stop();
};

export { connect, disconnect };
