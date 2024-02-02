import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/aiwrapper");
    console.log("database connected");
  } catch (error) {
    console.log("failed to connect");
  }
};

export default connectDB;
