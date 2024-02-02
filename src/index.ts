import connectDB from "./database/database";

import Express from "express";
import bodyParser from "body-parser";

const cors = require("cors");

const app = Express();
connectDB();

app.use(Express.json());
app.use(bodyParser.json());
app.use(cors());

import promptRouters from "./routes/prompt.route";

app.use("/generate", promptRouters);

app.listen(3500, () => {
  console.log("server running");
});
