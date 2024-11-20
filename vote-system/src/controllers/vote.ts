import { Request, RequestHandler, Response } from "express";
import Vote from "../models/Vote";
import { createResponse } from "../lib/response";
import Candidature from "../models/Candidature";

const voteControllers = {
  async vote(req: Request<{ candidateId: string }>, res: Response) {
    const { userId } = req;
    const { candidateId } = req.params;

    const candidate = await Candidature.findById(candidateId);

    if (candidate?.status !== "accepted") {
      return createResponse(res, 400, "This candidate is rejected or pending");
    }

    // y a 4 position tu peux voter un par chque
    // tu peux voter plusieur fois mais pas same position

    const voteExist = await Vote.findOne({
      user: userId,
      candidatureFor: candidate.candidatureFor,
    });

    if (voteExist) {
      return createResponse(
        res,
        400,
        "You have already voted for this position"
      );
    }

    // add field for count vote

    const vote = await Vote.create({
      user: userId,
      candidate: candidateId,
      candidatureFor: candidate.candidatureFor,
    });

    const populatedVote = await vote.populate("candidate user");

    return createResponse(res, 201, "Vote created", populatedVote);
  },

  async getVotesForCandidate(
    req: Request<{ candidateId: string }>,
    res: Response
  ) {
    const { candidateId } = req.params;
    const votes = await Vote.find({ candidate: candidateId }).countDocuments();

    if (!votes) {
      return createResponse(res, 404, "Votes not found");
    }

    return createResponse(res, 200, "Votes fetched", votes);
  },
  getStats: async (req: Request, res: Response) => {
    const votes = await Vote.aggregate([
      {
        $group: {
          _id: "$candidate",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "candidatures",
          localField: "_id",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $unwind: "$candidate",
      },
      {
        $lookup: {
          from: "users",
          localField: "candidate.user",
          foreignField: "_id",
          as: "candidate.user",
        },
      },
      {
        $unwind: "$candidate.user",
      },
      {
        $project: {
          _id: 0,
          count: 1,
          user: "$candidate.user",
        },
      },
    ]);

    return createResponse(res, 200, "Stats fetched", votes);
  },
};

export default voteControllers;
