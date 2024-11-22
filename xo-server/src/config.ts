import { Application } from "express";
import mongoose from "mongoose";
import "dotenv/config";

export async function runServer(app: Application) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}
