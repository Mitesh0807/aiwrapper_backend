import Express from "express";
import modelsController from "../controller/model.controller";

const modelRouter = Express.Router();

modelRouter.get("/", modelsController.modelsList);
modelRouter.post("/add", modelsController.createUser);
modelRouter.post("/addAPI", modelsController.addApiId);
modelRouter.delete("/deleteApiID", modelsController.deleteApiID);
modelRouter.delete("/deleteAll", modelsController.deleteAllApi);
modelRouter.get("/getAllApi/:userId", modelsController.getAllApi);
modelRouter.get("/getUser/:userId", modelsController.getUser);

export default modelRouter;
