import express from "express";
import { createUpdate, updateProfileTab } from "../controllers/profile.controller";
import { imageUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/basicDetail", imageUpload.single("image"), createUpdate);
router.patch("/:tabName", updateProfileTab);

export default router;
