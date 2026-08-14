import "dotenv/config";
import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { verifyDatabaseConnection } from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
    try {
        await verifyDatabaseConnection();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`GraphQuest API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start server:", error);

        process.exit(1);
    }
};

startServer();