import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB, runServer } from "./config";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use(errorHandler);

// Run server and connect to database
runServer(app);
connectDB();
