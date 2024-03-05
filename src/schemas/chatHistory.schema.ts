import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
    },
    createdAt: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "chatdetails",
    },
  },
  { timestamps: true }
);

const chatHistorySchema = mongoose.model("chatHistory", historySchema);
export default chatHistorySchema;
