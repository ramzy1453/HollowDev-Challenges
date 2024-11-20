import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import voteControllers from "../controllers/vote";
import { VoteValidator } from "../middlewares/validators/vote";
import validator from "../middlewares/validator";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.post(
  "/:candidateId",
  isAuth,
  VoteValidator.validId,
  validator,
  voteControllers.vote
);

router.get(
  "/count/:candidateId",
  isAuth,
  isAdmin,
  VoteValidator.validId,
  validator,
  voteControllers.getVotesForCandidate
);

router.get("/stats", isAuth, isAdmin, voteControllers.getStats);
export default router;
