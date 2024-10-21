import { Request, Response, NextFunction } from "express";
import AppError from "../lib/errors";

export default function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
}
