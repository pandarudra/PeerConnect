import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
