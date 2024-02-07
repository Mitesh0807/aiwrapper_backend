import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("URL not found, update env");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (error) {
    console.log("failed to connect", error);
  }
};

export default connectDB;
