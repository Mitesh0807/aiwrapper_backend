import mongoose from "mongoose";
import chatHistorySchema from "../schemas/chatHistory.schema";
import chatDetailsModel from "../schemas/chatDetails.schema";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI: any = new GoogleGenerativeAI(
  "AIzaSyBdAkz-s7VOeS4U54-u4wHDZz_cPJPt-Kk"
);

const chatHistory = async (req: Request, res: Response) => {
  const { chatFlag } = req.body;
  const { user_id } = req.body;

  try {
    if (chatFlag) {
      const newChat = await chatHistorySchema.create(req.body);

      const { prompt } = req?.body;

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream([prompt]);
      let text = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
      }

      const saveResponse = await chatDetailsModel.create({
        promptDetails: prompt,
        promptResponse: text,
        user_id,
        chatID: newChat._id,
      });

      res.status(200).send({
        promptResponse: text,
        _id: newChat._id,
        prompt: newChat.prompt,
        user_id: newChat.user_id,
        createdAt: newChat.createdAt,
      });
    } else {
      const { prompt, chatID } = req?.body;
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream([prompt]);
      let text = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
      }

      const oldResponse = await chatDetailsModel.create({
        promptDetails: prompt,
        promptResponse: text,
        chatID,
      });
      res.send(oldResponse);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ response: "Unable to save chat at the moment, try again later" });
  }
};

const getChatHistory = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    const getDetails = await chatHistorySchema
      .find({ user_id })
      .populate("_id")
      .sort({ createdAt: -1 });

    res.status(200).send({ response: getDetails });
  } catch (error) {
    res.status(500).send({
      response: "Unable to fetch data check credentials or try again later",
    });
  }
};

const getChatDetails = async (req: Request, res: Response) => {
  const { chatID } = req.body;
  console.log("chatID :", chatID);
  try {
    const chatDtailsResponse = await chatDetailsModel.find({
      chatID: new mongoose.Types.ObjectId(chatID),
    });
    console.log("chatDtailsResponse :", chatDtailsResponse);
    res.send({ reqsponse: chatDtailsResponse });
  } catch (error) {
    res.status(500).send({
      response: "Not able to fetch details, check User or try again later ",
    });
  }
};

export default {
  chatHistory,
  getChatHistory,
  getChatDetails,
};
