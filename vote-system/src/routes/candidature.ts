import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import candidatureControllers from "../controllers/candidature";
import { CandidatureValidator } from "../middlewares/validators/candidature";
import validator from "../middlewares/validator";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.post(
  "/",
  isAuth,
  CandidatureValidator.create,
  validator,
  candidatureControllers.createCandidature
);

router.get(
  "/",
  isAuth,
  CandidatureValidator.get,
  validator,
  candidatureControllers.getAcceptedCandidates
);
router.get(
  "/all",
  isAuth,
  isAdmin,
  CandidatureValidator.get,
  validator,
  candidatureControllers.getCandidatures
);
router.get(
  "/:id",
  isAuth,
  CandidatureValidator.validId,
  validator,
  candidatureControllers.getCandidatureById
);

router.get(
  "/:id",
  isAuth,
  CandidatureValidator.validId,
  validator,
  candidatureControllers.getCandidatureById
);
router.put(
  "/:id",
  isAuth,
  CandidatureValidator.validId,
  validator,
  candidatureControllers.updateCandidatureById
);
router.delete(
  "/:id",
  isAuth,
  CandidatureValidator.validId,
  validator,
  candidatureControllers.deleteCandidatureById
);

router.post(
  "/accept/:id",
  isAuth,
  isAdmin,
  CandidatureValidator.validId,
  validator,
  candidatureControllers.accepetCandidature
);

router.post(
  "/reject/:id",
  isAuth,
  isAdmin,
  CandidatureValidator.validId,
  validator,
  candidatureControllers.rejectCandidature
);

export default router;
