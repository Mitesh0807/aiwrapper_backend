import Express from "express";
import chatHistoryController from "../controller/chatHistory.controller";

const chatHistoryRouter = Express.Router();

chatHistoryRouter.post("/chat", chatHistoryController.chatHistory);
chatHistoryRouter.post("/getHistory", chatHistoryController.getChatHistory);
chatHistoryRouter.post("/getDetails", chatHistoryController.getChatDetails);

export default chatHistoryRouter;
