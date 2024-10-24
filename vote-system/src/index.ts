import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { connectDB, runServer } from "./config";
import authRouter from "./routes/auth";
import voteRouter from "./routes/vote";
import candidatureRouter from "./routes/candidature";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve);
app.use(morgan("dev"));
app.use("/api/v1/", express.static("public"));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/candidature", candidatureRouter);
app.use("/api/v1/vote", voteRouter);
app.use(errorHandler);

// Run server and connect to database
runServer(app);
connectDB();
