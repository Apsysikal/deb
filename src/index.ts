import { app } from "./app";

const port = app.get("port");

app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});