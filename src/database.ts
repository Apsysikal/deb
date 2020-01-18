import mongoose, { Mongoose } from "mongoose";
import { logger } from "./util/logger";

const databaseUser = process.env.MONGO_USER || "";
const databasePassword = process.env.MONGO_PASSWORD || "";

function eventLogger(priority: string, message: string): void {
    logger.info(message);
}

export async function connect(dbName: string): Promise<Mongoose> {
    const connectionString = `mongodb+srv://${databaseUser}:${databasePassword}@cluster-rbd0a.mongodb.net/test?retryWrites=true&w=majority`;

    const db = mongoose;

    db.connection.on("connecting", () => { eventLogger("info", "Connecting to database"); });
    db.connection.on("connected", () => { eventLogger("info", "Connected to database"); });
    db.connection.on("disconnecting", () => { eventLogger("info", "Disconnecting from database"); });
    db.connection.on("disconnected", () => { eventLogger("info", "Disconnected to database"); });
    db.connection.on("close", () => { eventLogger("info", "Closed connection to database"); });
    db.connection.on("reconnected", () => { eventLogger("info", "Reconnected to database"); });
    db.connection.on("error", (error: Error) => { eventLogger("error", "Error in database: " + error.message); });
    db.connection.on("reconnectFailed", () => { eventLogger("error", "Reconnect failed. No more retries will be done."); });

    try {
        await db.connect(connectionString, {
            dbName: dbName,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        return db;
    } catch (error) {
        throw error;
    }
}