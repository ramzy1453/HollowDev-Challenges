import { Request, Response, NextFunction } from "express";
import AppError from "../lib/errors";
import { MongooseError } from "mongoose";

export default function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof MongooseError) {
    if (err.statusCode === 11000) {
      err.statusCode = 400;
      err.message = "Duplicate field value entered";
    }
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
}
