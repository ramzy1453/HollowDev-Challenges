import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB, runServer } from "./config";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1/", express.static("public"));

// Routes
app.use(errorHandler);

// Run server and connect to database
runServer(app);
connectDB();
