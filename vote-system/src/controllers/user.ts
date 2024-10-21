import { Request, Response } from "express";
import { UserCreateBody } from "../types/user";
import User from "../models/User";
import { createResponse } from "../utils/response";
import { NotFoundError } from "../utils/errors";

const userController = {
  // POST
  async createUser(req: Request<{}, {}, UserCreateBody>, res: Response) {
    const user = await User.create(req.body);
    return createResponse(res, 201, "User created with success", user);
  },
  // GET
  async getUsers(req: Request, res: Response) {
    const users = await User.find();
    return createResponse(res, 200, "Users retrieved with success", users);
  },
  // GET
  async getUserById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const user = await User.findOne({ id });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "User retrieved with success", user);
  },
  
};

export default userController;
