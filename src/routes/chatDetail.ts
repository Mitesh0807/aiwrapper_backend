import express from "express";
import chatDtailController from "../controller/chatDetails";

const chatDetailRouter = express.Router();

chatDetailRouter.post("/chat", chatDtailController.postChatDetails);

export default chatDetailRouter;
