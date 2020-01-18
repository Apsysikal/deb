import { app } from "./app";
import * as db from "./database";
import { logger } from "./util/logger";

const port = app.get("port");
const dbName = process.env.NODE_ENV || "development";

async function main(): Promise<void> {
    try {
        await db.connect(dbName);

        app.listen(port, () => {
            logger.info(`App running on port ${port}`);
        });
    } catch (error) {
        logger.error(error);
    }
}

main();