import { Request, Response } from "express";
import {
  CreateCandidatureBody,
  UpdateCandidatureBody,
} from "../types/candidature";
import Candidature from "../models/Candidature";
import { createResponse } from "../lib/response";
import User from "../models/User";

const candidatureControllers = {
  // POST /candidature
  async createCandidature(
    req: Request<{}, {}, CreateCandidatureBody>,
    res: Response
  ) {
    // Admin can't candidate
    const user = await User.findOne({ user: req.userId });

    if (user?.role === "admin") {
      return createResponse(res, 400, "Admin can't candidate");
    }

    const candidature = await Candidature.create({
      ...req.body,
      user: req.userId,
    });

    return createResponse(
      res,
      201,
      "Candidature created with success",
      await candidature.populate("user")
    );
  },
  // GET /candidature/:id,
  async getCandidatureById(req: Request<{ id: string }>, res: Response) {
    const candidatures = await Candidature.find({
      user: req.userId,
      status: "accepted",
    }).populate("user");

    return createResponse(res, 200, "Candidatures fetched", candidatures);
  },
  // GET /candidature/
  async getCandidatures(
    req: Request<{}, {}, {}, { candidatureFor: string }>,
    res: Response
  ) {
    const positions = req.query?.candidatureFor?.split(",");

    const candidatures = await Candidature.find(
      positions ? { candidatureFor: { $in: positions } } : {}
    ).populate("user");

    return createResponse(res, 200, "Candidatures fetched", candidatures);
  },
  async getAcceptedCandidates(
    req: Request<{}, {}, {}, { candidatureFor: string }>,
    res: Response
  ) {
    const positions = req.query?.candidatureFor?.split(",");

    const candidatures = await Candidature.find({
      status: "accepted",
      ...(positions ? { candidatureFor: { $in: positions } } : {}),
    }).populate("user");

    return createResponse(res, 200, "Candidatures fetched", candidatures);
  },
  // PUT /candidature/:id
  async updateCandidatureById(
    req: Request<{ id: string }, {}, UpdateCandidatureBody>,
    res: Response
  ) {
    const { id } = req.params;
    const candidature = await Candidature.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return createResponse(res, 200, "Candidature updated", candidature);
  },

  async deleteCandidatureById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    await Candidature.findByIdAndDelete(id);

    return createResponse(res, 200, "Candidature deleted");
  },

  async accepetCandidature(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const candidature = await Candidature.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );

    return createResponse(res, 200, "Candidature accepted", candidature);
  },

  async rejectCandidature(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const candidature = await Candidature.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    return createResponse(res, 200, "Candidature rejected", candidature);
  },
};

export default candidatureControllers;
