import { Request, Response } from "express";
import { UserRegisterBody, UserUpdateBody } from "../types/user";
import User from "../models/User";
import { createResponse } from "../lib/response";
import { NotFoundError } from "../lib/errors";

const userController = {
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
  // PUT
  async updateUser(
    req: Request<{ id: string }, {}, UserUpdateBody>,
    res: Response
  ) {
    const { id } = req.params;
    const user = await User.findOneAndUpdate({ id }, req.body, { new: true });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "User updated with success", user);
  },
  // DELETE
  async deleteUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ id });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "User deleted with success");
  },
};

export default userController;
