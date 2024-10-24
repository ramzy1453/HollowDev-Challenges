import { Request, RequestHandler, Response } from "express";
import Vote from "../models/Vote";
import { createResponse } from "../lib/response";
import Candidature from "../models/Candidature";

const voteControllers = {
  async vote(req: Request<{ candidateId: string }>, res: Response) {
    const { userId } = req;
    const { candidateId } = req.params;

    const candidate = await Candidature.findById(candidateId);

    if (candidate?.status === "rejected") {
      return createResponse(res, 400, "This candidate is rejected");
    }

    const vote = await Vote.create({
      user: userId,
      candidate: candidateId,
    });

    return createResponse(res, 201, "Vote created", vote);
  },

  async getVotesForCandidate(
    req: Request<{ candidateId: string }>,
    res: Response
  ) {
    const { candidateId } = req.params;
    const votes = await Vote.find({ candidate: candidateId }).countDocuments();

    return createResponse(res, 200, "Votes fetched", votes);
  },
  getStats : async (req: Request, res: Response) => {
    const votes = await Vote.aggregate([
      {
        $group: {
          _id: "$candidate",
          count: { $sum: 1 },
        },
      },
    ]);

    return createResponse(res, 200, "Stats fetched", votes);
  }
};

export default voteControllers;
