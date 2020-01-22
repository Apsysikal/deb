import express from "express";
// import path from "path";

import { indexRouter } from "./routes/index";
import { bookRouter } from "./routes/book";

const app = express();

app.set("port", process.env.PORT || 3000);
// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "pug");

app.use(express.json());
app.use("/", indexRouter);
app.use("/book", bookRouter);

export { app };