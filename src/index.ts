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
import chatHistoryRouter from "./routes/chatHistory.route";
import chatDetailRouter from "./routes/chatDetail";

app.use("/generate", promptRouters);

app.use("/user", modelRouter);
app.use("/chatHistory", chatHistoryRouter);
app.use("/chatDetail", chatDetailRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server running");
});
