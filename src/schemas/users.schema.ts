import mongoose from "mongoose";
import apiModel from "./api.schema";

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   default: "test",
  // },
  apiId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "apikey",
    },
  ],
  given_name: {
    typr: String,
  },
  family_name: {
    type: String,
  },
  nickname: {
    type: String,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  locale: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  email_verified: {
    type: String,
  },
  sub: {
    type: String,
  },
});

const addUSer = mongoose.model("users", userSchema);
export default addUSer;
