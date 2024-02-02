import Express from "express";
import promptController from "../controller/prompt.controller";

const promptRouter = Express.Router();

promptRouter.post("/", promptController);

export default promptRouter;
