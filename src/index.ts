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

app.use("/generate", promptRouters);

app.use("/user", modelRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server running");
});
