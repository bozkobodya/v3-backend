import mongoose from 'mongoose';

const connectDB = async (mongoURI: string) => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
