import connectDB from "./database/database";

import Express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

const cors = require("cors");

const app = Express();
connectDB();

app.use(Express.json());
app.use(bodyParser.json());
app.use(cors());

import promptRouters from "./routes/prompt.route";
import modelRouter from "./routes/model.route";
import apiModel from "./schemas/api.schema";

app.use("/generate", promptRouters);
app.use("/models", modelRouter);
app.use("/user", modelRouter);
app.use("/api", modelRouter);
app.use("/delete", modelRouter);
app.use("/delete", modelRouter);
app.use("/get", modelRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server running");
});
