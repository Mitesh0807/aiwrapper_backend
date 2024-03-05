import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    promptDetails: {
      type: String,
    },
    promptResponse: {
      type: String,
    },
    chatID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatHistory",
    },
  },
  { timestamps: true }
);

const chatDetailsSchema = mongoose.model("chatDetails", querySchema);
export default chatDetailsSchema;
