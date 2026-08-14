import express from "express";
import cors from "cors";
import developerRoutes from "./routes/developerRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
    })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "GraphQuest API is running",
    });
});


app.use("/api/developers", developerRoutes);

app.use(errorHandler);

export default app;