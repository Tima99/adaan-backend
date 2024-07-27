import express from "express";
const router = express.Router();
import {
  register,
  login,
  verifyEmail,
  logOut,
} from "../controllers/auth.controller.js";
import { validateReq } from "../middleware/validate.js";
import { imageUpload } from "../middleware/upload.middleware.js";
import { validateEmail, validatePassword } from "../utils/custom-validator.js";

router.post(
  "/register",
  [validateEmail("@email")],
  validateReq,
  register
);
router.get("/verify/:token", verifyEmail);

router.post("/login", [validateEmail("@email")], validateReq, login);

router.post("/logOut", logOut);

export default router;
