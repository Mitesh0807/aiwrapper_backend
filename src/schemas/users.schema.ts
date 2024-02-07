import mongoose from "mongoose";
import apiModel from "./api.schema";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "test",
  },
  apiId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "apikey",
    },
  ],
});

const addUSer = mongoose.model("users", userSchema);
export default addUSer;
