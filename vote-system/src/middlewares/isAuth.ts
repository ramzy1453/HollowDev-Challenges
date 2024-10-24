import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../lib/errors";
import { verifyToken } from "../lib/utils";

export default async function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    throw new UnauthorizedError("Access Token is missing");
  }

  const accessToken = authHeaders.split(" ")[1];
  if (!accessToken) {
    throw new UnauthorizedError("Access Token is missing");
  }

  try {
    const data = await verifyToken<{ userId: string }>(accessToken);
    req.userId = data.userId;
    next();
  } catch (error) {
    throw new UnauthorizedError("Access Token is invalid");
  }
}
