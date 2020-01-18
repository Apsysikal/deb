import path from "path";
import winston from "winston";

export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: path.resolve(__dirname, "..", "logs", "combined.log"),
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            filename: path.resolve(__dirname, "..", "logs", "error.log"),
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});

if (process.env.NODE_ENV === "development") {
    const console = new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    });

    logger.add(console);
};
