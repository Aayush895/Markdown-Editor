import mongoose from 'mongoose';

async function dbConnect() {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected');
  } catch (error) {
    console.log('Failed to connect with DB');
    console.log(error);
  }
}

export default dbConnect;
