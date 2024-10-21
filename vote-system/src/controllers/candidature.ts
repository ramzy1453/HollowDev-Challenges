import { Request, Response } from "express";
import { CreateCandidatureBody } from "../types/candidature";
import Candidature from "../models/Candidature";

const candidatureControllers = {
  // POST
  async createCandidature(
    req: Request<{}, {}, CreateCandidatureBody>,
    res: Response
  ) {
    const candidature = await Candidature.create(req.body);
  },
};

export default candidatureControllers;