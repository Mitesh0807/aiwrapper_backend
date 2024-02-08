import Express from "express";
import modelsController from "../controller/model.controller";

const modelRouter = Express.Router();

modelRouter.get("/", modelsController.modelsList);
modelRouter.post("/add", modelsController.createUser);
modelRouter.post("/addAPI", modelsController.addApiId);
modelRouter.get("/getAllApi/:userId", modelsController.getAllApi);
modelRouter.get("/getUser/:userId", modelsController.getUser);
modelRouter.delete("/deleteApiID", modelsController.deleteApiID);
modelRouter.delete("/deleteAll", modelsController.deleteAllApi);
modelRouter.delete("/deleteSelected", modelsController.deleteSelectedApi);
modelRouter.put("/editAPI", modelsController.editApi);
export default modelRouter;
