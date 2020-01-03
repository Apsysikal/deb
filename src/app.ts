import express from "express";
import path from "path";

import { indexRouter } from "./routes/index";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use("/", indexRouter);

export { app };