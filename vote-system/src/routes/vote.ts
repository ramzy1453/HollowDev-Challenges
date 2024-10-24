import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import voteControllers from "../controllers/vote";
import { VoteValidator } from "../middlewares/validators/validator";
import validator from "../middlewares/validator";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.put(
  "/:id",
  isAuth,
  VoteValidator.validId,
  validator,
  voteControllers.vote
);

router.put(
  ":/id",
  isAuth,
  isAdmin,
  VoteValidator.validId,
  validator,
  voteControllers.getVotesForCandidate
);

router.get("/", isAuth, isAdmin, voteControllers.getStats);
export default router;
