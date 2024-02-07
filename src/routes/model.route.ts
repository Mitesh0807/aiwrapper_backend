import Express from "express";
import modelsController from "../controller/model.controller";

const modelRouter = Express.Router();

modelRouter.get("/", modelsController.modelsList);
modelRouter.post("/add", modelsController.postModel);
modelRouter.post("/key", modelsController.addApiId);
modelRouter.delete("/apiID", modelsController.deleteApiID);
modelRouter.delete("/all", modelsController.deleteAllApi);
modelRouter.get("/allApi", modelsController.getAllApi);

export default modelRouter;
