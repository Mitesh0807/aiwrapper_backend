import mongoose from "mongoose";
import chatDetailsSchema from "../schemas/chatDetails.schema";
import { Request, Response } from "express";

const postChatDetails = async (req: Request, res: Response) => {
  try {
    res.send({ response: req.body });
  } catch (error) {
    res.status(500).send({ response: "Failed to save chat details" });
  }
};

export default {
  postChatDetails,
};
