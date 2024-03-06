import Express from "express";
import chatHistoryController from "../controller/chatHistory.controller";

const chatHistoryRouter = Express.Router();

chatHistoryRouter.post("/chat", chatHistoryController.chatHistory);
chatHistoryRouter.get("/getHistory", chatHistoryController.getChatHistory);
chatHistoryRouter.get("/getDetails", chatHistoryController.getChatDetails);

export default chatHistoryRouter;
