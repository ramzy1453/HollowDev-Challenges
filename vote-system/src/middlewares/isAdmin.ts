import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../lib/errors";
import { verifyToken } from "../lib/utils";
import User from "../models/User";

export default async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  if (user.role !== "admin") {
    throw new UnauthorizedError("User is not an admin");
  }

  next();
}
