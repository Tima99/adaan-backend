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

router.post("/register", [validateEmail("@email")], validateReq, register);

// creating password with after otp
router.post(
  "/verify/:email",
  verifyEmail
);

router.post("/login", [validateEmail("@email")], validateReq, login);

router.post("/logOut", logOut);

export default router;
